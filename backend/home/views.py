from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, redirect
from .models import Product, CartItem,Category
from django.core import serializers
import json
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from .serializer import (ProductSerializer,CategorySerializer,CartSerializer,ALLProductSerializer)



# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
    products = Product.objects.all()
    serializer = ALLProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def product(request,id):
    products = Product.objects.filter(id=id)
    serializer = ALLProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def categoriesList(request):
        print(request.user)
        category = Category.objects.all()
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

        

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def productListWithCategory(request,id):
        category = Product.objects.filter(category=id)
        print("test",category)
        serializer = ALLProductSerializer(category, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def CartItems(request):
    data={}
    data['product']=request.data['product']
    data['quantity']=request.data['quantity']
    data['user']=request.user.id
    cartValue=CartItem.objects.filter(product=request.data['product'],user=request.user.id)
    if cartValue:
         serializer=CartSerializer(cartValue, many=True)
         newQuantity=serializer.data[0]['quantity']+request.data['quantity']
         cartValue.update(quantity=newQuantity)
         return Response({"message":"cart added successfully"}, status=status.HTTP_201_CREATED)     
    serializer = CartSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# user cart value
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userCart(request):
        cartItemsData = CartItem.objects.filter(user=request.user.id)
        print("dd",cartItemsData)
        cart = CartSerializer(cartItemsData, many=True)
        data=[]
        for i in cart.data:
            print("test",i['product'])
            productData={}
            pData={}
            productData['id']=i['id']
            productData['quantity']=i['quantity']
            productName=Product.objects.filter(id=i['product'])
            p=ALLProductSerializer(productName,many=True)
            for j in p.data:
                  pData['id']=j['id']
                  pData['name']=j['name']
                  pData['image']=j['image']
                  pData['stock']=j['stock']
                  pData['price']=j['price']
            productData['product']=pData
            data.append(productData)
        return Response(data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def CartDelete(request,id):
        cartItemsData = CartItem.objects.filter(id=id).delete()
        return Response({"message":"cart removed successfully"}, status=status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update(request):
        print(request.data['quantity'])
        quantity=request.data['quantity']
        id=request.data['id']
        # print("test",quantity,id)
        cartItemsData = CartItem.objects.filter(id=id,user=request.user.id).update(quantity=quantity)
        return Response({"message":"cart Updted successfully"}, status=status.HTTP_200_OK)
