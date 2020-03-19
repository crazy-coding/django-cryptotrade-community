from django.shortcuts import render
from django.views import View


class SearchResults(View):

    def get(self, request):
        s = request.GET.get('s', '')
        return render(request, 'search-results.html', {'s': s})
