import os
import django
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'IlStudioChat.settings')

asgi_app = get_asgi_application()

from chat_app import routing


django.setup()

application = ProtocolTypeRouter({
  "http": asgi_app,
  "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    )
})