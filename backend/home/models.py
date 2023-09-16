from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name= models.CharField(max_length=50)

    def __str__(self):
        return str(self.name)

class Product(models.Model):
    name = models.CharField(max_length=60)
    price= models.IntegerField(default=0)
    category= models.ForeignKey(Category,on_delete=models.CASCADE,default=1 )
    stock= models.IntegerField()
    image= models.ImageField(upload_to='uploads/products/',blank=True)

    def __str__(self):
        return str(self.name)

# class Cart(models.Model):
#     user=models.ForeignKey(User,on_delete=models.CASCADE,default=1)

#     def __str__(self):
#         return str(self.user)

#     @property
#     def total_price(self):
#         cartitems = self.cartitems.all()
#         total = sum([item.price for item in cartitems])
#         return total
    
    
      
#     @property
#     def num_of_items(self):
#         cartitems = self.cartitems.all()
#         quantity = sum([item.quantity for item in cartitems])
#         return quantity


class CartItem(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,default=1)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='items')
    quantity = models.IntegerField(default=0)
    
    def __str__(self):
        return self.product.name
    @property
    def name(self):
        return self.fk.name
    




