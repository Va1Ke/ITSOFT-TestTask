from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import viewsets, mixins
from limitOrder.api.serializers import StockSerializer, OrderSerializer, TransactionSerializer
from limitOrder.api.utils import find_orders
from limitOrder.forms import UserRegistrationForm
from limitOrder.models import Stock, Order, Transaction


def user_register(request):
    if request.method == 'POST':
        User.objects.create_user(username=str(request.POST['username']),
                                 email=str(request.POST['email']),
                                 password=str(request.POST['password1']))
        return redirect('/limit-order-book/login')

    form = UserRegistrationForm()
    return render(request, 'registration.html', {'form': form})


def user_login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('/limit-order-book/api/order/')
        else:
            return HttpResponse(status=400)
    return render(request, 'login.html')


def user_logout(request):
    logout(request)
    return redirect('/limit-order-book/login')


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer


class OrderViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Order.objects.exclude(order_status="EXECUTED")
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        order = serializer.save(user=self.request.user)
        find_orders(order)


class TransactionViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
