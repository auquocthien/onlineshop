from django.db.models.signals import post_save, pre_delete
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Category


@receiver(post_save, sender=Category)
def create_category(sender, **kwargs):
    print('create category success')
