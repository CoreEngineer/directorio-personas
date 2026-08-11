from django.shortcuts import render

def index(request):
    return render(request, 'personas/index.html')
# Create your views here.

