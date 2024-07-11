from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from .models import weather
from .serializers import weatherSerializer

class weatherAPIView(APIView):
    def get(self, request):
        objects = weather.objects.all()
        serializer = weatherSerializer(objects, many=True)
        return Response(serializer.data)