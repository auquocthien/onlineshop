from rest_framework import viewsets
from rest_framework import views
from rest_framework.response import Response
from django.db import transaction
from django.shortcuts import get_object_or_404
from .serializer import OrderSerializer, OrderItemSerializer
from ..models import OrderItem, Order
from shop.models import Product
import ast


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    @transaction.atomic
    def create(self, request):
        print(request.data)
        order = OrderSerializer(data=request.data)
        order.is_valid(raise_exception=True)
        order.save()
        order = Order.objects.filter().latest('id')
        for item in request.data['items']:
            serializer = OrderItemSerializer(data=item)
            serializer.is_valid(raise_exception=True)
            serializer.save(order=order)
            prod = Product.objects.get(id=item['id'])
            prod.quantity = prod.quantity - item['quantity']
            prod.save()
        return Response(OrderSerializer(order).data)


class OrderListView(views.APIView):
    queryset = Order.objects.all()

    def post(self, request):
        dict_body = request.body.decode('utf-8')
        dict_body = str(dict_body)
        print(dict_body)
        dict_body = ast.literal_eval(dict_body)
        email = dict_body['email']

        instance = Order.objects.filter(
            email__exact=email).order_by("-created")
        serializer = OrderSerializer(instance, many=True)
        return Response(serializer.data)


class OrderItemViewSet(viewsets.ModelViewSet):
    serializer_class = OrderItemSerializer
    queryset = OrderItem.objects.all()
