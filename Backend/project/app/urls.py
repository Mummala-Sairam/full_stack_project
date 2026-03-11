from django.urls import path
from .views import register_user, get_user_profile, get_workers, get_worker

urlpatterns = [
    path('register/', register_user, name='register'),
    path('me/', get_user_profile, name='user_profile'),
    path('workers/', get_workers, name='workers'),
    path('workers/<int:pk>/', get_worker, name='worker_detail'),
]
