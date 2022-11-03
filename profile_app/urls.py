from .views import ProfileView
from rest_framework import routers

router = routers.SimpleRouter()

router.register(r'profile', ProfileView)


urlpatterns = router.urls
