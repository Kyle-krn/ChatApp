from rest_framework.viewsets import ModelViewSet
from .models import ChatRoom
from .serializers import RoomSerializer


class ChatRoomViewSet(ModelViewSet):
    queryset = ChatRoom.objects.all().order_by('created_at')
    serializer_class = RoomSerializer
    http_method_names = ['get', 'post']
    
    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    