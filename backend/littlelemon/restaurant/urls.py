from atexit import register
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('menu-items/', views.MenuItemView.as_view(), name='menu-items'),
    path('menu-items/<int:pk>/', views.MenuItemDetailView.as_view(),
         name='single-menu-item'),
    path("specials/", views.specials),
    path("menu-items/", views.all_menu_items),
    path('orders/create/', views.create_order),
    path('orders/', views.my_orders),
    path('register/', views.register),
    path('login/', views.login),
]



