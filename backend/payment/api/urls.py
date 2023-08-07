from . import views
from django.urls import path, include

urlpatterns = [
    path('client_token/', views.PaymentView.as_view(), name='client_token'),
    # path('create/<pk>/', views.create_payment, name='create_payment')
    path('create/<pk>/', views.PaymentView.as_view(), name='create')
]
