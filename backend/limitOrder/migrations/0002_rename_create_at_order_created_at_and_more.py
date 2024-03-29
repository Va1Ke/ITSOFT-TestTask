# Generated by Django 5.0.1 on 2024-01-22 09:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('limitOrder', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='create_at',
            new_name='created_at',
        ),
        migrations.RenameField(
            model_name='transaction',
            old_name='create_at',
            new_name='created_at',
        ),
        migrations.AlterField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('PENDING', 'Pending'), ('EXECUTED', 'Executed')], max_length=8),
        ),
    ]
