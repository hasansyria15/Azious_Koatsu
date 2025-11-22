from django.shortcuts import render


# Vue simple de la page d'accueil
def index(request):
    return render(request, 'index.html', {
        'title': 'Accueil - KOATSU',
        'message': 'Bienvenue sur KOATSU!'
    })


# Vue de la page services
def services(request):
    return render(request, 'services.html', {
        'title': 'Services - KOATSU',
        'page_title': 'Services',
        'message': 'Nos services de transport et logistique'
    })
