import json
import uuid
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from .models import ChatRoom, Message
from channels.db import database_sync_to_async

class RoomsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'rooms'

        if isinstance(self.scope['user'], AnonymousUser):
            print('jere')
            return await self.close()
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        rooms = await self.get_rooms()
        await self.send(text_data=json.dumps(
            {
                'type': 'all_rooms',
                'rooms': rooms
            }
        ))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data_json = json.loads(text_data)
        if 'type' not in data_json:
            return
        elif data_json['type'] == 'createRoom':
            try:
                created_rooms = await self.create_rooms(data_json['title'], self.scope['user'])
                return await self.channel_layer.group_send(
                                    self.room_group_name,
                                    {
                                        'type': 'send_created_room',
                                        'id': str(created_rooms.id),
                                        'title': created_rooms.title,
                                        'created_at': str(created_rooms.created_at)
                                    }
                                )

            except ValueError:
                return await self.send(text_data=json.dumps(
                {
                    'type': 'title_unique'
                }
        ))

    
    
    async def send_created_room(self, event: dict):
        await self.send(text_data=json.dumps(
            {
                'type': 'created_room',
                'room': {
                    'id': event['id'],
                    'title': event['title'],
                    'created_at': event['created_at']
                }
            }
        )
        )
        
    @database_sync_to_async
    def get_rooms(self):
        return [{'id': str(chat_room['id']), 'title': chat_room['title'], 'created_at': str(chat_room['created_at'])} for chat_room in ChatRoom.objects.values('id', 'title', 'created_at').order_by('-created_at')]

    @database_sync_to_async
    def create_rooms(self, title, creator):
        if ChatRoom.objects.filter(title=title).exclude():
            raise ValueError()
        return ChatRoom.objects.create(title=title, creator=creator)
        
        

class ChatRoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if isinstance(self.scope['user'], AnonymousUser):
            await self.accept()
            return await self.close()
        
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'room_%s' % self.room_id
        try:
            self.room = await self.get_room()
        except ChatRoom.DoesNotExist:
            self.room = None
            await self.accept()
            await self.send(text_data=json.dumps(
                {
                    'type': 'chat_not_found',
                }
            ))
            return await self.close()

        
        
        
        await self.connect_user_to_room_db()
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        
        count = await self.count_user_online()
        
        await self.send(text_data=json.dumps(
            {
                'type': 'connected_to_chat',
                'count_online': count,
                'title_room': self.room.title,
                'messages': []
            }
        )
        )
        
        await self.channel_layer.group_send(
                                    self.room_group_name,
                                    {
                                        'type': 'join_in_room',
                                        'id': str(uuid.uuid4()),
                                        'user_id': self.scope['user'].id,
                                        'username': self.scope['user'].username
                                    }
                                )
        
        
    async def receive(self, text_data):
        
        data_json = json.loads(text_data)
        if 'type' not in data_json:
            return
        elif data_json['type'] == 'newMessage':
            print(data_json)
            message = await self.create_message(id=data_json['id'], message=data_json['message']) 
            await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                'type': 'new_message',
                                'id': str(message.id),
                                'message': message.message,
                                'created_at': str(message.created_at),
                                'user_id': message.user_id,
                                'username': self.scope['user'].username
                            }
                        )
        


        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        
        if self.room:
            await self.disconnect_user_to_room_db()
        
        await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                'type': 'leave_in_room',
                                'id': str(uuid.uuid4()),
                                'user_id': self.scope['user'].id,
                                'username': self.scope['user'].username
                            }
                        )





    async def join_in_room(self, event: dict):
        await self.send(text_data=json.dumps(
            {
                'type': 'join_in_room',
                'id': event['id'],
                'user': {
                    'user_id': event['user_id'],
                    'username': event['username']
                }
            }
        )
        )

    async def leave_in_room(self, event: dict):
        await self.send(text_data=json.dumps(
            {
                'type': 'leave_in_room',
                'id': event['id'],
                'user': {
                    'user_id': event['user_id'],
                    'username': event['username']
                }
            }
        )
        )
        
    async def new_message(self, event: dict):
        await self.send(text_data=json.dumps(
            {
                'type': 'new_message',
                'message': {
                    'id': event['id'],
                    'message': event['message'],
                    'created_at': event['created_at'],
                    'user_id': event['user_id'],
                    'username': event['username']
                }
            }
        ))
        

        
    @database_sync_to_async
    def get_room(self):
        return ChatRoom.objects.get(id=self.room_id)
    
    @database_sync_to_async
    def connect_user_to_room_db(self):
        self.room.online.add(self.scope['user'])
    
    @database_sync_to_async
    def disconnect_user_to_room_db(self):
        self.room.online.remove(self.scope['user'])
    
    @database_sync_to_async
    def count_user_online(self):
        return self.room.get_online_count()

    @database_sync_to_async
    def create_message(self, id, message):
        return Message.objects.create(id=id, room=self.room, message=message, user=self.scope['user'])
        # return self.room.get_online_count()
    