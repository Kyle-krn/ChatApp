from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib import auth
from .serializers import LoginSerializers


@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializers(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        auth.login(request, user)
        return Response({"status": status.HTTP_200_OK})        


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'}, status=status.HTTP_200_OK)
    

class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({ 'success': 'Loggout Out' }, status=status.HTTP_200_OK)
        except:
            return Response({ 'error': 'Something went wrong when logging out' }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({ 'isAuthenticated': 'success' }, status=status.HTTP_200_OK)
            else:
                return Response({ 'isAuthenticated': 'error' }, status=status.HTTP_401_UNAUTHORIZED)
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)