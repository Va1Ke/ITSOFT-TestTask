from django.db.models import QuerySet
from limitOrder.models import Order, Transaction
from django.db.models import Q


def find_orders(order: Order):
    match_order_type = 'BUY' if order.order_type == 'SELL' else 'SELL'
    found_orders = Order.objects.exclude(Q(user=order.user) | Q(order_status='EXECUTED')).filter(stock=order.stock,
                                                                                                 order_type=match_order_type,
                                                                                                 stock_price=order.stock_price)
    if len(found_orders) > 0:
        execute_transaction(order, found_orders, order.order_type)
    else:
        order.order_status = 'PENDING'
        order.save()


def execute_transaction(order: Order, found_orders: QuerySet, order_type: str):
    for found_order in found_orders:
        if order.quantity == found_order.quantity:
            transaction_equal_amount(order, found_order)
            return
        if order_type == 'BUY':
            transaction_not_equal_amount(order, found_order)
        elif order_type == 'SELL':
            transaction_not_equal_amount(found_order, order)
        if order.order_status == 'EXECUTED':
            return


def transaction_not_equal_amount(buy_order: Order, sell_order: Order):
    Transaction.objects.create(
        buy_order=buy_order,
        sell_order=sell_order
    )
    if buy_order.quantity > sell_order.quantity:
        buy_order.quantity = buy_order.quantity - sell_order.quantity
        sell_order.order_status = 'EXECUTED'
        buy_order.order_status = 'PART_EXECUTED'
    elif buy_order.quantity < sell_order.quantity:
        sell_order.quantity = sell_order.quantity - buy_order.quantity
        buy_order.order_status = 'EXECUTED'
        sell_order.order_status = 'PART_EXECUTED'
    buy_order.save()
    sell_order.save()


def transaction_equal_amount(buy_order: Order, sell_order: Order):
    Transaction.objects.create(
        buy_order=buy_order,
        sell_order=sell_order
    )
    update_status(buy_order, 'EXECUTED')
    update_status(sell_order, 'EXECUTED')


def update_status(order, status):
    order.order_status = status
    order.save()
