from django.db import models
from django.conf import settings
from django.db import models
import uuid

class ChatRoom(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    title = models.CharField(max_length=255, unique=True)
    creator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='creator',
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'chat_room'
        