# chat/consumers.py
from ast import Raise
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
# from channels.db import database_sync_to_async
from .models import ChatRoom
from channels.db import database_sync_to_async

class RoomConsumer(AsyncWebsocketConsumer):
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
        