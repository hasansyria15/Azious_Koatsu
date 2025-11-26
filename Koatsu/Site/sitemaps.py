from django.contrib.sitemaps import Sitemap
from django.urls import reverse


class StaticViewSitemap(Sitemap):
    """
    Sitemap pour les pages statiques du site Koatsu
    """
    priority = 0.8
    changefreq = 'weekly'
    protocol = 'https'

    def items(self):
        """
        Liste des pages du site
        """
        return [
            'site:home',
            'site:services',
            'site:about',
            'site:contact',
        ]

    def location(self, item):
        """
        Retourne l'URL de chaque page
        """
        return reverse(item)

    def priority(self, item):
        """
        Définit la priorité pour chaque page
        """
        priorities = {
            'site:home': 1.0,
            'site:services': 0.9,
            'site:about': 0.7,
            'site:contact': 0.8,
        }
        return priorities.get(item, 0.5)

    def changefreq(self, item):
        """
        Définit la fréquence de changement pour chaque page
        """
        frequencies = {
            'site:home': 'daily',
            'site:services': 'weekly',
            'site:about': 'monthly',
            'site:contact': 'monthly',
        }
        return frequencies.get(item, 'monthly')
