from datetime import datetime
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
                                        'created_at': created_rooms.created_at.isoformat()
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
        return [{'id': str(chat_room['id']), 
                'title': chat_room['title'], 
                'created_at': chat_room['created_at'].isoformat()} for chat_room in ChatRoom.objects.values('id', 'title', 'created_at').order_by('-created_at')]

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
        messages, is_have_message_up = await self.get_messages()
        await self.send(text_data=json.dumps(
            {
                'type': 'connected_to_chat',
                'count_online': count,
                'title_room': self.room.title,
                'messages': messages,
                'is_have_message_up': is_have_message_up
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
            message = await self.create_message(id=data_json['id'], message=data_json['message']) 
            await self.channel_layer.group_send(
                            self.room_group_name,
                            {
                                'type': 'new_message',
                                'id': str(message.id),
                                'message': message.message,
                                'created_at': message.created_at.isoformat(),
                                'user_id': message.user_id,
                                'username': self.scope['user'].username
                            }
                        )
        elif data_json['type'] == 'getOldMessage':
            created_at_last_message = data_json['lastCreatedAd']
            created_at_last_message = datetime.strptime(created_at_last_message, "%Y-%m-%d %H:%M:%S.%f")
            print(created_at_last_message)
            old_messages, is_have_message_up = await self.get_old_message(created_at_last_message)
            await self.send(text_data=json.dumps(
            {
                'type': 'old_messages',
                'messages': old_messages,
                'is_have_message_up': is_have_message_up
            }
            )
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
                'created_at': datetime.utcnow().isoformat(),
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
                'created_at': datetime.utcnow().isoformat(),
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
    def create_message(self, id: uuid.UUID, message: str):
        return Message.objects.create(id=id, room=self.room, message=message, user=self.scope['user'])
    
    @database_sync_to_async
    def get_messages(self, offset: int = 0, limit: int = 50):
        all_count_messages = Message.objects.filter(room=self.room).count()
        all_count_messages > (offset+limit)
        return [{
                 'type': 'new_message',
                 'message': {
                    'id': str(i.id),
                    'user_id': i.user.id,
                    'message': i.message,
                    'created_at': i.created_at.isoformat(),
                    'username': i.user.username
                 }
                 
                 } for i in Message.objects.filter(room=self.room).order_by('-created_at')[offset:limit]], all_count_messages > (offset+limit)
    
    @database_sync_to_async
    def get_old_message(self, last_message_created_at):
        all_count_messages = Message.objects.filter(room=self.room, created_at__lt=last_message_created_at).count()
        return [{
                 'type': 'new_message',
                 'message': {
                    'id': str(i.id),
                    'user_id': i.user.id,
                    'message': i.message,
                    'created_at': i.created_at.isoformat(),
                    'username': i.user.username
                 }
                 
                 } for i in Message.objects.filter(room=self.room, created_at__lt=last_message_created_at).order_by('-created_at')[:50]], all_count_messages > 50