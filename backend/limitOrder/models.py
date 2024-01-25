from decimal import Decimal
from django.core.validators import MinValueValidator
from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


class Stock(models.Model):
    name = models.CharField(max_length=80, blank=False)
    token = models.CharField(max_length=10, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=12, validators=[MinValueValidator(Decimal('0.01'))],
                                blank=False)

    def __str__(self):
        return f'{self.name} - {self.token}'


class Order(models.Model):
    class OrderType(models.TextChoices):
        BUY = "BUY", _("BUY")
        SELL = "SELL", _("SELL")

    class OrderStatus(models.TextChoices):
        PENDING = "PENDING", _("PENDING")
        PART_EXECUTED = "PART_EXECUTED", _("PART_EXECUTED")
        EXECUTED = "EXECUTED", _("EXECUTED")

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE, null=False)
    stock_price = models.DecimalField(decimal_places=2, max_digits=12, validators=[MinValueValidator(Decimal('0.01'))],
                                      null=False)
    order_type = models.CharField(max_length=4, choices=OrderType.choices, null=False)
    order_status = models.CharField(max_length=14, choices=OrderStatus.choices, null=False)
    quantity = models.PositiveIntegerField(null=False)
    created_at = models.DateTimeField(default=timezone.now, null=False)


class Transaction(models.Model):
    buy_order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, related_name='buy_order')
    sell_order = models.ForeignKey(Order, on_delete=models.CASCADE, blank=True, related_name='sell_order')
    created_at = models.DateTimeField(default=timezone.now, null=False)
