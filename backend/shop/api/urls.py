from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('products', views.ProductListView, basename='product')
router.register('category', views.CategoryListView, basename='category')
router.register('comment', views.CommentListView, basename='comment')
router.register('rate', views.ProductRateListView, basename='rate')
urlpatterns = [
    # path('product/', views.ProductListView.as_view(), name='product_list_view'),
    # path('product/<pk>/', views.ProductDetailView.as_view(),
    #      name='product_detail_view')
    path('', include(router.urls))
]
