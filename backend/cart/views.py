from django.shortcuts import render, redirect, get_object_or_404
from django.views.decorators.http import require_POST
from shop.models import Product
from coupons.forms import CouponForm
from .cart import Cart
from .form import CartAddProductForm
# Create your views here.


@require_POST
def cart_add(req, product_id):
    cart = Cart(req)
    product = get_object_or_404(Product, id=product_id)
    form = CartAddProductForm(req.POST)
    if form.is_valid():
        cd = form.cleaned_data
        cart.add(product=product,
                 quantity=cd['quantity'], override_quantity=cd['override'])
    return redirect('cart:cart_detail')


@require_POST
def cart_remove(req, product_id):
    cart = Cart(req)
    product = get_object_or_404(Product, id=product_id)
    cart.remove(product)
    return redirect('cart:cart_detail')


def cart_detail(req):
    cart = Cart(req)
    for item in cart:
        print(item)
        item['update_quantity_form'] = CartAddProductForm(
            initial={
                'quantity': item['quantity'],
                'override': True
            }
        )
    coupon_apply_form = CouponForm()
    return render(req, 'cart/detail.html', {'cart': cart, 'coupon_apply_form': coupon_apply_form})
