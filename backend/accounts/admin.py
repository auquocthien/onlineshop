from django.contrib import admin
from .models import UserData
# Register your models here.


@admin.register(UserData)
class UserDataAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'is_staff', 'is_active', 'is_superuser']
