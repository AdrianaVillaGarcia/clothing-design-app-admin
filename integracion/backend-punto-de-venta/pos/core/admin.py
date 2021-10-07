from django.contrib import admin
from core.models import User
from core.models import Mesa
from core.models import Categoria
from core.models import Plato
from core.models import Producto

# Register your models here.


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Mesa)
class MesaAdmin(admin.ModelAdmin):
    pass 

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    pass 

@admin.register(Plato)
class PlatoAdmin(admin.ModelAdmin):
    pass 

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    pass 