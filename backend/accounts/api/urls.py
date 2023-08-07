from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

# router = routers.DefaultRouter()
# router.register('', views.UserApiView, basename='user')

urlpatterns = [
    path('register/', views.UserApiView.as_view(), name='user_register'),
    path('detail/<pk>/', views.UserApiView.as_view(), name='user_detail'),
    path('token/', views.UserTokenObtainPairView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name="token_refresh")
]
