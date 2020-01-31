from django.urls import path
from django.views.generic import TemplateView

from . import views
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
app_name = ''
urlpatterns = [
    # Not Logged In
    # path('login/', views.Login.as_view(), name='login'),
    path('login', TemplateView.as_view(template_name='login.html'), name='login'),
    
    # # Login Required
    # path('logout/', views.logout, name='logout'),

    path('', TemplateView.as_view(template_name='home.html'), name='index'),
    path('home/', TemplateView.as_view(template_name='home.html'), name='home'),
    path('your-posts/', TemplateView.as_view(template_name='your-posts.html'), name='your-posts'),
    path('search-results/', views.SearchResults.as_view(), name='search-results'),
    path('community-rules/', TemplateView.as_view(template_name='community-rules.html'), name='community-rules'),
    path('report-post/', TemplateView.as_view(template_name='report-post.html'), name='report-post'),
    path('community-single-post/<int:pk>', TemplateView.as_view(template_name='community-single-post.html'), name='community-single-post'),
    path('community-create-post/', TemplateView.as_view(template_name='community-create-post.html'), name='community-create-post'),
    path('community-create-post/<int:pk>', TemplateView.as_view(template_name='community-create-post.html'), name='community-edit-post')
]
