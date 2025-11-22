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


# Vue de la page about
def about(request):
    return render(request, 'about.html', {
        'title': 'About Us - KOATSU Global',
        'page_title': 'About Us'
    })


# Vue de la page contact
def contact(request):
    return render(request, 'contact.html', {
        'title': 'Contact Us - KOATSU Global',
        'page_title': 'Contact Us'
    })
