from django.urls import path
from . import views

app_name = 'site'

urlpatterns = [
    # Page d'accueil simple
    path('', views.index, name='home'),
    path('accueil/', views.index, name='home'),
    # Page services
    path('services/', views.services, name='services'),
    # Page about
    path('about/', views.about, name='about'),
    # Page contact
    path('contact/', views.contact, name='contact'),
]