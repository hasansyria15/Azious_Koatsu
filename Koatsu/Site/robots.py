from django.http import HttpResponse
from django.views.decorators.http import require_GET


@require_GET
def robots_txt(request):
    """
    Vue pour générer le fichier robots.txt
    """
    lines = [
        "User-agent: *",
        "Disallow: /admin/",
        "Disallow: /api/",
        "",
        "# Sitemap",
        f"Sitemap: {request.build_absolute_uri('/sitemap.xml')}",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")
