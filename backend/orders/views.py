from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.admin.views.decorators import staff_member_required
from django.conf import settings
from django.http import HttpResponse
from django.template.loader import render_to_string
import weasyprint
from .models import OrderItem, Order
from .forms import OrderCreateForm
from cart.cart import Cart
from .tasks import order_created
from django.urls import reverse
# Create your views here.


def order_create(req):
    cart = Cart(req)
    if req.method == 'POST':
        form = OrderCreateForm(req.POST)
        if form.is_valid():
            order = form.save(commit=False)
            if cart.coupon:
                order.coupon = cart.coupon
                order.discount = cart.coupon.discount
            order.save()
            for item in cart:
                OrderItem.objects.create(
                    order=order, product=item['product'], price=item['price'], quantity=item['quantity'])
            cart.clear()
            order_created.delay(order.id)
            req.session['order_id'] = order.id
            # return render(req, 'order/created.html')
            return redirect(reverse('payment:process'))
    else:
        form = OrderCreateForm()
    return render(req, 'order/create.html', {'cart': cart, 'form': form})


@staff_member_required
def admin_order_detail(req, order_id):
    order = get_object_or_404(Order, id=order_id)
    return render(req, 'admin/orders/order/detail.html', {'order': order})


@staff_member_required
def admin_order_pdf(req, order_id):
    order = get_object_or_404(Order, id=order_id)
    html = render_to_string('order/pdf.html', {'order': order})
    res = HttpResponse(content_type='application/pdf')
    res['Content-Disposition'] = f'filename=order_{order.id}.pdf'
    weasyprint.HTML(string=html).write_pdf(res, stylesheets=[weasyprint.CSS(
        settings.STATIC_ROOT + 'css/pdf.css'
    )])
    return res
