from django.urls import path
from . import views

urlpatterns = [
    path('current-forecast', views.current_forecast),
    path('four-day-forecast', views.four_day_forecast)
]