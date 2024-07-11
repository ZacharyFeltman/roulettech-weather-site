from django.urls import path
from . import views

urlpatterns = [
    path('current-forecast', views.current_forecast)
]