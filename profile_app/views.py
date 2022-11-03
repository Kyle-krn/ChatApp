from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import permissions, status
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.contrib import auth
from .serializers import ProfileSerializer
from .models import Profile
from rest_framework.decorators import action


@method_decorator(csrf_protect, name='dispatch')
class ProfileView(ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    http_method_names = ['get']
    
    def list(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user.profile)
        return Response(serializer.data, status=status.HTTP_200_OK)        

    @action(detail=False, methods=['get'])
    def toggleNotification(self, request):
        profile = request.user.profile
        profile.isNotificationMessage = not profile.isNotificationMessage
        profile.save()
        return self.list(request)