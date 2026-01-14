from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class MenuItem(models.Model):

    ITEM_TYPES = [
        ("appetizer", "Appetizer"),
        ("entree", "Entree"),
        ("dessert", "Dessert"),
        ("drink", "Drink"),
    ]

    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    type = models.CharField(max_length=20, choices=ITEM_TYPES)
    is_special = models.BooleanField(default=False)
    description = models.TextField()
    image = models.ImageField(
        upload_to='menu_images/',       # folder for uploaded images
    )

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="pending")
    total = models.DecimalField(max_digits=8, decimal_places=2, default=0)

    def __str__(self):
        return f"Order #{self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name="items", on_delete=models.CASCADE)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.quantity} x {self.menu_item.name}"
