from django.urls import path
from . import views

urlpatterns = [
    path('current-forecast', views.current_forecast),
    path('all-day-forecast', views.all_day_forecast)
]