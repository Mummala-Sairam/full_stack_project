from django.db import models
from django.contrib.auth.models import User

class Worker(models.Model):
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)  # e.g., Electrician, Plumber
    rating = models.FloatField(default=0.0)
    reviews_count = models.IntegerField(default=0)
    experience = models.CharField(max_length=50) # e.g., '8 Years'
    price = models.IntegerField(default=0)
    availableNow = models.BooleanField(default=True)
    avatar = models.URLField(max_length=500, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name

class WorkerSlot(models.Model):
    worker = models.ForeignKey(Worker, related_name='slots', on_delete=models.CASCADE)
    time = models.CharField(max_length=50) # e.g., '9:00 AM - 10:00 AM'
    status = models.CharField(max_length=20, choices=[('available', 'Available'), ('booked', 'Booked')])

    def __str__(self):
        return f"{self.worker.name} - {self.time}"
