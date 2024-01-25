from django.test import TestCase
import pytest
from rest_framework.test import APIClient
from limitOrder.models import User, Stock, Order, Transaction
from rest_framework_simplejwt.tokens import RefreshToken


@pytest.mark.django_db
class TestPostModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='test', email='test@gmail.com', password='test1234')
        self.api = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.api.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')
        self.stock = Stock.objects.create(name='Apple', token='AAPL', price=190)
        self.order = Order.objects.create(user=self.user, stock=self.stock, stock_price=180, order_type="BUY", order_status="PENDING", quantity=5)

    def test_jwt_authorization(self):
        response = self.api.get(f"/limit-order-book/api/stock/")
        assert response.status_code == 200

    def test_add_stock(self):
        data = {
            "name": "Microsoft",
            "token": "MSFT",
            "price": 150
        }
        response = self.api.post(f"/limit-order-book/api/stock/", data)
        assert response.status_code == 201
        assert response.json()['token'] == data['token']

    def test_list_stocks(self):
        response = self.api.get(f"/limit-order-book/api/stock/")
        assert response.status_code == 200
        assert response.json()['count'] > 0

    def test_add_order(self):
        data = {
          "stock": "AAPL",
          "stock_price": "100",
          "order_type": "BUY",
          "quantity": 3
        }
        response = self.api.post(f"/limit-order-book/api/order/", data)
        assert response.status_code == 201
        assert response.json()['quantity'] == data['quantity']

    def test_list_orders(self):
        response = self.api.get(f"/limit-order-book/api/order/")
        assert response.status_code == 200
        assert response.json()['count'] > 0

    def test_list_transactions(self):
        response = self.api.get(f"/limit-order-book/api/transaction/")
        assert response.status_code == 200
