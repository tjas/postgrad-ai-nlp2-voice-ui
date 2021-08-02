from django.urls import path

from . import views

app_name = 'voice'

urlpatterns = [
    path('', views.index, name='index'),
    path('tts/', views.tts, name='tts'),
    path('stt/', views.stt, name='stt'),
    path('settings/', views.settings, name='settings'),
]