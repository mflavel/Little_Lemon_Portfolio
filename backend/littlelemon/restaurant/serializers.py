from rest_framework import serializers
from .models import MenuItem, OrderItem, Order

class MenuItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = MenuItem
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.ReadOnlyField(source="menu_item.name")
    menu_item_price = serializers.ReadOnlyField(source="menu_item.price")

    class Meta:
        model = OrderItem
        fields = ["id", "menu_item", "menu_item_name", "menu_item_price", "quantity"]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ["id", "user", "created_at", "status", "total", "items"]
        read_only_fields = ["total", "created_at"]


