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
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

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
def my_orders(request):
    orders = Order.objects.filter(user=request.user).order_by("-created_at")
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["POST"])
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

@api_view(["POST"])
def register(request):
    username = request.data.get("username")
    password = request.data.get("password")
    email = request.data.get("email", "")

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        email=email
    )

    return Response({"message": "User created"})

@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return Response({"error": "Invalid username or password"}, status=400)

    refresh = RefreshToken.for_user(user)

    return Response({
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "username": user.username
    })