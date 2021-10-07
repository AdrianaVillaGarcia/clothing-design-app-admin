from rest_framework import serializers
from core.serializers.producto_serializer import ProductoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Producto

class ProductoAPI(APIView):
    #GET: obtener todas los productos en el sistema | Necesito un serializador
    def get(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(productos, many=True)

        return Response(
            {
                "ok": True,
                "content": serializer.data
            }
        )

    #POST: CREACIÓN
    #Alguien va a llamar a mi API y va a crear un producto
    def post(self, request):
        data = request.data
        serializer = ProductoSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "ok" : True
            })
        else:
            return Response({
                "errors": serializer.errors
            })

    #PUT : EDITAR, ACTUALIZAR
    def put(self, request, pk=None):
        data = request.data
        producto = Producto.objects.filter(pk=pk)
        serializer = ProductoSerializer(data=data)
        if serializer.is_valid():
            producto.update(**serializer.validated_data)
            return Response({
                "ok" : True
            })
        else:
            return Response({
                "errors": serializer.errors
            })
    
    #DELETE : BORRAR
    def delete(self, request, pk=None):
        producto = Producto.objects.filter(pk=pk)
        producto.delete()
        return Response({
            "ok" : True
        })

        

