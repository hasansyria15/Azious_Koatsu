from django.shortcuts import render


# Vue simple de la page d'accueil
def index(request):
    return render(request, 'index.html', {
        'title': 'Accueil - KOATSU',
        'message': 'Bienvenue sur KOATSU!'
    })
