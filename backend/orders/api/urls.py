from rest_framework.routers import DefaultRouter
from . import views
from django.urls import path, include

router = DefaultRouter()
router.register('order', views.OrderViewSet)
router.register('orderitem', views.OrderItemViewSet)
urlpatterns = [
    path('orderlist/', views.OrderListView.as_view(), name='order-list'),
    path('', include(router.urls))
]
