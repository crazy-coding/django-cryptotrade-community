from django.conf import settings

def app_decorator(request):

    return { 'token': '', 'main_site_url': settings.MAIN_SITE_URL }
