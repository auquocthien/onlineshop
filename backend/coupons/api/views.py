from rest_framework import viewsets
from rest_framework.response import Response
from django.utils import timezone

from .serializers import CouponSerializer
from ..models import Coupon


class CouponListView(viewsets.ModelViewSet):
    serializer_class = CouponSerializer
    queryset = Coupon.objects.all()

    def retrieve(self, request, pk):
        now = timezone.now()
        instance = Coupon.objects.get(
            code__iexact=pk, valid_from__lte=now, valid_to__gte=now, active=True)
        serializer = CouponSerializer(instance)
        return Response(serializer.data)
