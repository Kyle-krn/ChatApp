from django.urls import re_path, path

from . import consumers

websocket_urlpatterns = [
    path(r'ws/rooms/', consumers.RoomsConsumer.as_asgi()),
    re_path(r'ws/room/(?P<room_id>[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/$', consumers.ChatRoomConsumer.as_asgi())
]