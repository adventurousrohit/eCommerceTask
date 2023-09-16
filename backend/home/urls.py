from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("product", views.index, name="product"),
    path("product/<int:id>", views.product, name="product detail"),
    path("category", views.categoriesList, name="add-category"),
    path("category-product/<int:id>", views.productListWithCategory, name="category-product"),
    path("cart", views.CartItems, name="cart"),
    path("user-cart", views.userCart, name="user-cart"),
    path("cart-update", views.update, name="cart-update"),
    path("cart-delete/<int:id>", views.CartDelete, name="cart-delete"),


]