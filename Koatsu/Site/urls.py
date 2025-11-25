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

    # API Cookies et Langue
    path('api/cookie-consent/', views.set_cookie_consent, name='cookie_consent'),
    path('api/set-language/', views.set_language, name='set_language'),
    path('api/cookie-status/', views.get_cookie_status, name='cookie_status'),
]