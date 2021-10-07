from rest_framework import serializers

from core.models import Producto

class ProductoSerializer(serializers.Serializer):
    
    producto_id = serializers.SerializerMethodField('get_id')
    producto_nom = serializers.CharField(max_length=50)
    producto_pre = serializers.CharField(max_length=50)
    producto_img = serializers.SerializerMethodField('get_img')
    producto_des = serializers.CharField(max_length=50)


    def get_id(self, obj):
        return obj.id

     #Método de validación
    def save(self):
        validated_data = self.validated_data
        producto = Producto.objects.create(**validated_data)
        return producto

    def get_img(self, obj):
        return "http://localhost:8000/assets/" + str(obj.producto_img)



