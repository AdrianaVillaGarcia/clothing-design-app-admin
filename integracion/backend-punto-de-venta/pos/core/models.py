from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE

# Create your models here.
#Se crea de acuerdo a lo que te pide el front end.

#Modelo para el inicio de sesión
#Correo único, nombre max 50 caracteres, apellido max 50 caracteres, tipo de usuario max 50 caracteres
# se crea un usuario personalizado no el que Django trae.
#Pregunta el tipo de usuario, depende de eso ingresas a admin o pos.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    usu_nom = models.CharField(max_length=50)
    usu_ape = models.CharField(max_length=50)
    usu_tipo = models.CharField(max_length=50)

#Cada vez que ejecuto una migración se crea una tabla del modelo de base de datos
#y se puede actualizar en múltiples ocasiones.
#Creamos el model de 'Mesa'

class Mesa(models.Model):
    mesa_nro = models.IntegerField(null=True, blank=True)
    mesa_cap = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)

class Categoria(models.Model):
    categoria_nom = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)


class Plato(models.Model):
    plato_pre = models.FloatField()
    plato_nom = models.CharField(max_length=50)
    plato_img = models.ImageField(upload_to="plato_fotos")
    categoria = models.ForeignKey(Categoria, on_delete=CASCADE)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)

class Producto(models.Model):
    producto_nom = models.CharField(max_length=50)
    producto_pre = models.FloatField()
    producto_img = models.ImageField(upload_to="producto_fotos")
    producto_des = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now_add = True)






