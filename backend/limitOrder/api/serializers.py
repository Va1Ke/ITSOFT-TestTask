from rest_framework import serializers
from limitOrder.models import Stock, Order, Transaction


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ["id", "name", "token", "price"]


class OrderSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()
    stock = serializers.SlugRelatedField(slug_field='token', queryset=Stock.objects.all())

    class Meta:
        model = Order
        fields = ["id", "user", "stock", "stock_price", "order_type", "order_status", "quantity", "created_at"]
        read_only_fields = ['order_status', 'created_at']


class TransactionSerializer(serializers.ModelSerializer):
    buy_order = OrderSerializer(read_only=True)
    sell_order = OrderSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ["id", "buy_order", "sell_order", "created_at"]
        read_only_fields = ['created_at']
