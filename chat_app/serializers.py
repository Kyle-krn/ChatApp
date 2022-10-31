from rest_framework import serializers
from .models import ChatRoom


class RoomSerializer(serializers.ModelSerializer):    
    class Meta:
        model = ChatRoom
        fields = ['id', 'title', 'created_at', 'updated_at']