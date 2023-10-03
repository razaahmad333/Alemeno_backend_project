from django.urls import path

from .views import  UrineStripUpload

urlpatterns = [ 
    path('urine_strip/', UrineStripUpload.as_view()),
]