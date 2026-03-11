from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .serializers import UserSerializer, WorkerSerializer
from .models import Worker

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    data = request.data
    try:
        if User.objects.filter(username=data.get('email')).exists():
            return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create(
            first_name=data.get('name', ''),
            username=data.get('email'),
            email=data.get('email')
        )
        user.set_password(data.get('password'))
        user.save()
        
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_workers(request):
    workers = Worker.objects.all()
    serializer = WorkerSerializer(workers, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_worker(request, pk):
    try:
        worker = Worker.objects.get(id=pk)
        serializer = WorkerSerializer(worker, many=False)
        return Response(serializer.data)
    except Worker.DoesNotExist:
        return Response({'detail': 'Worker not found'}, status=status.HTTP_404_NOT_FOUND)
