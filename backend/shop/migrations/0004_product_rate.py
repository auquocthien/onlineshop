# Generated by Django 4.2.2 on 2023-07-31 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0003_product_quantity'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='rate',
            field=models.IntegerField(choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], default=1),
        ),
    ]
