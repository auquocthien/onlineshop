from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import CouponListView

router = DefaultRouter()
router.register('coupon', CouponListView)

app_name = 'coupon'
urlpatterns = [
    path('', include(router.urls))
]
