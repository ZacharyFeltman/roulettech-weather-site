import requests
from rest_framework.decorators import api_view
from django.http import JsonResponse
#https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=08dd190c7c8c45f32976ddf50f81a383

@api_view(['GET'])
def current_forecast(request):
    city = request.GET.get('city', None)
    # Make API request here
    response = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid=08dd190c7c8c45f32976ddf50f81a383')
    #return JsonResponse({'city':city})
    return JsonResponse(response.json())
    