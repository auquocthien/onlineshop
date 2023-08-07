from django.db import models
from django.db.models.query import QuerySet
from django.urls import reverse
from accounts.models import UserData
# Create your models here.

PRODUCT_RATE_CHOICE = [(i, str(i)) for i in range(1, 6)]


class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200,  unique=True)

    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('shop:product_list_by_category', args=[self.slug])


class ProductRate(models.Model):

    avg_rate = models.DecimalField(decimal_places=2, max_digits=3)
    count = models.IntegerField()

    def __str__(self):
        return str(self.avg_rate)


class Product(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    desc = models.TextField(blank=True)

    image = models.ImageField(upload_to='products/%Y/%M/%d', blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    available = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    class Meta:
        ordering = ('-created',)
        index_together = (('id', 'slug'),)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("shop:product_detail", args=[self.id, self.slug])

    # def update_quantity(self, quantity):
    #     self.quantity = self.quantity - quantity


class Comment(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="comments")
    gmail = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return f'Comment by {self.name} at {self.created}'


class Rate(models.Model):
    product = models.OneToOneField(Product, on_delete=models.CASCADE)
    avg_rate = models.DecimalField(max_digits=10, decimal_places=2)
    count = models.IntegerField()
