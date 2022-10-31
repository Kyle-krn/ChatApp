from django.urls import path
from .views import GetCSRFToken, TestCSRF

urlpatterns = [
     path('csrf_cookie', GetCSRFToken.as_view()),
     path('test', TestCSRF.as_view()),
]


