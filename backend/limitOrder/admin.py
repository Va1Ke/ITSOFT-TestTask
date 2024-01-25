from django.contrib import admin

from .models import Stock, Order, Transaction

admin.site.register(Stock)
admin.site.register(Order)
admin.site.register(Transaction)
