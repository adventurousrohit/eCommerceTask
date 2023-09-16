from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register', views.register, name="register-page"),
    path('login', views.login, name="login-page"),
    path('user-info', views.UserDetail, name="user-info"),


]