from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Worker, WorkerSlot

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class WorkerSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkerSlot
        fields = '__all__'

class WorkerSerializer(serializers.ModelSerializer):
    slots = WorkerSlotSerializer(many=True, read_only=True)
    class Meta:
        model = Worker
        fields = '__all__'
