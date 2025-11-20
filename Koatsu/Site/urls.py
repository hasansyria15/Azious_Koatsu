from django.urls import path
from . import views

app_name = 'site'

urlpatterns = [
    # Page d'accueil simple
    path('', views.index, name='home'),
    path('accueil/', views.index, name='home'),
]