from rest_framework import serializers
from .models import Product,Category,CartItem


class CartSerializer(serializers.ModelSerializer):
#     product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(),
#                                               many=False)
    class Meta:
        model = CartItem
        fields = ('id','quantity')

class ProductSerializer(serializers.ModelSerializer):
    items=CartSerializer(many=True)
#     items = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'



class ALLProductSerializer(serializers.ModelSerializer):
#     items = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Product
        
# To get all fields use -> '__all__'
        fields = '__all__'



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        
# To get all fields use -> '__all__'
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
#     product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(),
#                                               many=False)

    class Meta:
        model = CartItem
        fields =  '__all__'

        
# To get all fields use -> '__all__'
        # fields =('id','quantity')


# class ProductSerializers(serializers.ModelSerializer):
#     items=CartSerializer(many=True)
#     class Meta:
#         model=Product
#         fields =  ('id', 'items')

    