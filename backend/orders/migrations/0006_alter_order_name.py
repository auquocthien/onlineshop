# Generated by Django 4.2.2 on 2023-07-31 02:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_rename_last_name_order_name_remove_order_first_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='name',
            field=models.CharField(max_length=50, verbose_name='name'),
        ),
    ]
