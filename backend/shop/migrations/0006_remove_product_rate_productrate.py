# Generated by Django 4.2.2 on 2023-08-04 06:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_alter_product_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='rate',
        ),
        migrations.CreateModel(
            name='ProductRate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avg_rate', models.DecimalField(decimal_places=2, max_digits=3)),
                ('count', models.IntegerField()),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rate', to='shop.product')),
            ],
        ),
    ]
