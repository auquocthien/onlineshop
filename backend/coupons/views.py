from django.shortcuts import render, redirect
from django.utils import timezone
from django.views.decorators.http import require_POST
from .models import Coupon
from .forms import CouponForm
# Create your views here.


def coupon_apply(req):
    now = timezone.now()
    form = CouponForm(req.POST)
    if form.is_valid():
        code = form.cleaned_data['code']
        try:
            coupon = Coupon.objects.get(
                code__iexact=code, valid_from__lte=now, valid_to__gte=now, active=True)
            req.session['coupon_id'] = coupon.id
        except Coupon.DoesNotExist:
            req.session['coupon_id'] = None
    return redirect('cart:cart_detail')
