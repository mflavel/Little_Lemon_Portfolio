from django.shortcuts import render
from rest_framework import generics
from .models import MenuItem, Order, OrderItem
from .serializers import OrderSerializer
from .serializers import MenuItemSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status

# Create your views here.
class MenuItemView(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

class MenuItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer

@api_view(['GET'])
def specials(request):
    specials_items = MenuItem.objects.filter(is_special=True)
    serializer = MenuItemSerializer(specials_items, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def all_menu_items(request):
    items = MenuItem.objects.all().order_by("type", "name")
    serializer = MenuItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user).order_by("-created_at")
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    data = request.data.get("items")

    if not data:
        return Response({"error": "No items provided"}, status=400)

    # Create order
    order = Order.objects.create(user=user)

    total = 0

    for item in data:
        menu_item = MenuItem.objects.get(id=item["menu_item"])
        quantity = item["quantity"]

        OrderItem.objects.create(
            order=order,
            menu_item=menu_item,
            quantity=quantity
        )

        total += menu_item.price * quantity

    order.total = total
    order.save()

    serializer = OrderSerializer(order)
    return Response(serializer.data, status=status.HTTP_201_CREATED)