from django.test import TestCase, Client
from django.contrib.auth.models import User
from django.urls import reverse
import json
from rest_framework import status
from django.contrib.auth import get_user_model

UserModel = get_user_model()
client = Client()

class AuthAppTest(TestCase):
    
    def setUp(self):
        self.user = UserModel.objects.create_user("foo", password="bar")
    
    def test_GetCsrfCookie(self):
        response = self.client.get(reverse("csrf_cookie"))
        self.assertEqual('csrftoken' in response.cookies.keys(), True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_auth(self):
        response = self.client.post(reverse("login"), {"username": "error_username", "password": "error_password"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response = self.client.post(reverse("login"), {"username": "foo", "password": "bar"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["user_id"], self.user.id)
        self.client.cookies = response.cookies
        response = self.client.get(reverse("check_authenticated"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response = self.client.post(reverse("logout"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json(), {'success': 'Loggout Out'})
