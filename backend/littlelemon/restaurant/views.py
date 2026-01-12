from django.shortcuts import render
from rest_framework import generics
from .models import MenuItem
from .serializers import MenuItemSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

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