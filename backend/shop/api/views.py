from rest_framework import generics
from rest_framework import viewsets, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.settings import api_settings
from django.shortcuts import get_object_or_404, get_list_or_404
from django.db.models import Q
from django.conf import settings

import redis
import ast

from ..models import Product, Category, Comment, Rate
from .serializers import ProductSerializer, CategorySerializer, CommentSerializer, ProductRateSerializer

from orders.models import OrderItem

r = redis.Redis(host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                db=settings.REDIS_DB)


class ProductListView(viewsets.ModelViewSet):
    queryset = Product.objects.filter(available=True)
    serializer_class = ProductSerializer
    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    def retrieve(self, request, pk=None):
        instance = Product.objects.filter(
            Q(id__contains=pk) | Q(slug__contains=pk))
        total_view = r.incr(f'product:{instance.first().id}:views')
        total_sold = OrderItem.objects.filter(product__slug=pk).count()
        print(total_sold)
        serializer = self.get_serializer(instance,  many=True)
        data = list(serializer.data)
        data.append({"total_view": total_view, "total_sold": total_sold})
        return Response(data)

    def update(self, request, pk=None, partial=True):
        instance = Product.objects.get(id__contains=pk)
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class CategoryListView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CommentListView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def retrieve(self, request, pk):
        instance = self.get_queryset().filter(Q(product=pk) & Q(active=True))
        serializer = self.get_serializer(instance, many=True)
        return Response(serializer.data)


class ProductRateListView(viewsets.ModelViewSet):
    queryset = Rate.objects.all()
    serializer_class = ProductRateSerializer

    def create(self, request):
        try:
            instance = get_object_or_404(Rate, product=request.data['product'])
            preTotalRate = instance.count * instance.avg_rate
            currentTotalRate = preTotalRate + request.data['avg_rate']
            instance.count = instance.count + 1
            instance.avg_rate = currentTotalRate / instance.count
            print(instance)
            instance.save()
            serializer = ProductRateSerializer(instance)
            return Response(serializer.data)
        except:
            serializer = ProductRateSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    def retrieve(self, request, pk=None):
        instance = self.get_queryset().filter(Q(product=pk))
        serializer = self.get_serializer(instance, many=True)
        return Response(serializer.data)
