from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class TestCSRF(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request):
        return Response({'ok': 'ok'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})