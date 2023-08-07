from rest_framework import serializers
from ..models import Product, Category, Comment, Rate


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['gmail', 'name', 'product', 'body', 'created']


class ProductRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rate
        fields = ['product', 'avg_rate', 'count']


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    comments = CommentSerializer(many=True)
    # rate = ProductRateSerializer()
    # total_view = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'category', 'desc', 'price', 'quantity',
                  'image', 'available', 'created', 'updated', 'comments',]
