from io import BytesIO
from celery import shared_task
import weasyprint
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings
from orders.models import Order


@shared_task
def payment_completed(order_id):
    order = Order.objects.get(id=order_id)
    subject = f'my shop - EE Invoice no. {order.id}'
    message = 'please, find attached the invoice for recent purchase'
    email = EmailMessage(subject, message, 'admin@myshop.com', [order.email])
    html = render_to_string('order/pdf.html', {'order': order})
    out = BytesIO()
    stylesheets = [weasyprint.CSS(settings.STATIC_ROOT + 'css.pdf')]
    weasyprint.HTML(string=html).write_pdf(out, stylesheets=stylesheets)
    email.attach(f'order_{order.id}.pdf', out.getvalue(), 'application/pdf')
    email.send()