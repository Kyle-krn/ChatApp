from rest_framework import serializers
from .models import ChatRoom
from rest_framework.validators import UniqueTogetherValidator, UniqueValidator


class RoomSerializer(serializers.ModelSerializer):    
    title = serializers.CharField(
    max_length=255,
    validators=[UniqueValidator(queryset=ChatRoom.objects.all(), message="Комната с таким именем уже существует.")]
)
    
    class Meta:
        model = ChatRoom
        fields = ['id', 'title', 'created_at', 'updated_at']
