from django.db import models

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
        default='menu_images/default.jpg'  # default image if none uploaded
    )

    def __str__(self):
        return self.name
