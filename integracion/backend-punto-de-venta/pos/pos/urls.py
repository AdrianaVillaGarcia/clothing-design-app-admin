"""pos URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from core.controllers.auth_controller import LoginAPI
from core.controllers.mesa_controller import MesaAPI
from core.controllers.plato_controller import PlatoAPI
from core.controllers.producto_controller import ProductoAPI

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login', LoginAPI.as_view()),
    path('mesa', MesaAPI.as_view()),
    path('mesa/<pk>', MesaAPI.as_view()),
    path('plato', PlatoAPI.as_view()),
    path('producto', ProductoAPI.as_view()),
    path('producto/<pk>', ProductoAPI.as_view())

]
 
urlpatterns += static(settings.MEDIA_URL, document_root =settings.MEDIA_ROOT)