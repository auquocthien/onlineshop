from django.shortcuts import render, redirect, get_object_or_404
import braintree
from django.conf import settings
from orders.models import Order
from .task import payment_completed

# Create your views here.
gateway = braintree.BraintreeGateway(settings.BRAINTREE_CONF)


def payment_process(req):
    order_id = req.session.get('order_id')
    order = get_object_or_404(Order, id=order_id)
    total_cost = order.get_total_cost()

    if req.method == "POST":
        nonce = req.POST.get('payment_method_nonce', None)
        reqult = gateway.transaction.sale({
            'amount': f'{total_cost:.2f}',
            'payment_method_nonce': nonce,
            'options': {
                'submit_for_settlement': True
            }
        })

        print(nonce)
        if reqult.is_success:
            order.paid = True
            order.braintree_id = reqult.transaction.id
            order.save()
            payment_completed.delay(order.id)
            return redirect('payment:done')
        else:
            return redirect('payment:canceled')
    else:
        client_token = gateway.client_token.generate()
        return render(req, 'payment/process.html', {'client_token': client_token, 'order': order})


def payment_done(req):
    return render(req, 'payment/done.html')


def payment_canceled(req):
    return render(req, 'payment/canceled.html')
