from django.urls import path
from .views import GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView

urlpatterns = [
     path('csrf_cookie', GetCSRFToken.as_view(), name="csrf_cookie"),
     path('login', LoginView.as_view(), name="login"),
     path('logout', LogoutView.as_view(), name="logout"),
     path('check_authenticated', CheckAuthenticatedView.as_view(), name="check_authenticated")
]


