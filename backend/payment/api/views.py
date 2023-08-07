from django.conf import settings
from django.shortcuts import get_object_or_404, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
import braintree
import ast
from orders.models import Order


class PaymentView(APIView):
    gateway = braintree.BraintreeGateway(settings.BRAINTREE_CONF)

    def get(self, request):
        client_token = self.gateway.client_token.generate()
        return Response({"client_token": client_token})

    @csrf_exempt
    def post(self, request, pk=None):
        order = get_object_or_404(Order, id=pk)
        total_cost = order.get_total_cost()

        dict_body = request.body.decode('utf-8')
        dict_body = ast.literal_eval(dict_body)
        nonce = dict_body['payment_method_nonce']
        result = self.gateway.transaction.sale({
            'amount': f'{total_cost:.2f}',
            'payment_method_nonce': nonce,
            'options': {
                'submit_for_settlement': True
            }
        })
        print(nonce)
        if result.is_success:
            order.paid = True
            order.braintree_id = result.transaction.id
            order.save()
            return Response({'status': 'success'})
        else:
            return Response({'status': 'fail'})
