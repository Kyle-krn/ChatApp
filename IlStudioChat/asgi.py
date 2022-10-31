import os
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.http import AsgiHandler

from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application
# import chat_app.routing
from chat_app import routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'IlStudioChat.settings')

application = ProtocolTypeRouter({
  "http": AsgiHandler(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    )
  # Just HTTP for now. (We can add other protocols later.)
})