from django.contrib import admin
from .models import Category, Product, Comment, Rate
# Register your models here.


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'quantity',
                    'available', 'created', 'category', ]
    list_filter = ['available', 'created', 'updated']
    list_editable = ['price', 'available', 'quantity', ]

    prepopulated_fields = {'slug': ('name',)}


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('gmail', 'name', 'product',
                    'created', 'active')
    list_filter = ('active', 'created', 'updated')
    search_fields = ('body', 'product')
    list_editable = ['active', ]


@admin.register(Rate)
class ProductRateAdmin(admin.ModelAdmin):
    list_display = ('product', 'avg_rate', 'count')
