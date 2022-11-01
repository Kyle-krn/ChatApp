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
    online = models.ManyToManyField(to=settings.AUTH_USER_MODEL, blank=True)

    def get_online_count(self):
        return self.online.count()

    def join(self, user):
        self.online.add(user)
        self.save()

    def leave(self, user):
        self.online.remove(user)
        self.save()

    def __str__(self):
        return f'{self.title} ({self.get_online_count()})'
    
    class Meta:
        db_table = 'chat_room'
        
        
class Message(models.Model):
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    room = models.ForeignKey(to=ChatRoom, on_delete=models.CASCADE)
    message = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}: {self.message} [{self.created_at}]'

    class Meta:
        db_table = 'messages'