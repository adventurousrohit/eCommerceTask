from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 
from rest_framework_simplejwt.views import TokenObtainPairView # for login page
from rest_framework.decorators import api_view,permission_classes
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from home.models import CartItem


from .serializers import (
    UserRegisterTokenSerializer, 
    UserDetails

)


# Create your views here.


# class UserRegisterView(APIView):
@api_view(['POST'])
def register( request, format=None):
    data = request.data # holds username and password (in dictionary)
    username = data["username"]
    email = data["email"]

    if username == "" or email == "":
        return Response({"detial": "username or email cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

    else:
        check_username = User.objects.filter(username=username).count()
        check_email =  User.objects.filter(email=email).count()

        if check_username:
            message = "A user with that username already exist!"
            return Response({"detail": message}, status=status.HTTP_403_FORBIDDEN)
        if check_email:
            message = "A user with that email address already exist!"
            return Response({"detail": message}, status=status.HTTP_403_FORBIDDEN)
        else:
            user = User.objects.create(
                username=username,
                email=email,
                password=make_password(data["password"]),
            )
            serializer = UserRegisterTokenSerializer(user, many=False)
            return Response(serializer.data)
           
           

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def login(request):
    username=request.data['username']
    password=request.data['password']
    user =authenticate(username=username,password=password)
    if user is not None:
        serializer = UserRegisterTokenSerializer(user).data
        data={}
        for k, v in serializer.items():
            data[k] = v
        return Response(data,status.HTTP_200_OK)
    else:
        return Response({"message":"not active member"},status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UserDetail(request):
        data=User.objects.filter(id=request.user.id)
        data=UserDetails(data, many=True)
        cartValue=CartItem.objects.filter(user=request.user.id).count()
        print(request.user)
        userData={}
        userData['user']=(data.data)[0]
        userData['cartCount']=cartValue
        # for i in data.data:

        print(cartValue)
        return Response(userData,status.HTTP_200_OK)
