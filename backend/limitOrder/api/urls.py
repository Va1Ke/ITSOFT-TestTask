from django.urls import path, include
from limitOrder import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'stock', views.StockViewSet)
router.register(r'order', views.OrderViewSet)
router.register(r'transaction', views.TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
