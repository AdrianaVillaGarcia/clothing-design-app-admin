#Va a ser un API View
from copy import error
from rest_framework import serializers
from core.serializers.mesa_serializer import MesaSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

from core.models import Mesa

class MesaAPI(APIView):
    #GET: obtener todas las mesas en el sistema | Necesito un serializador
    def get(self, request):
        mesas = Mesa.objects.all()
        serializer = MesaSerializer(mesas, many=True)

        return Response(
            {
                "ok": True,
                "content": serializer.data
            }
        )

    #POST: CREACIÓN
    #Alguien va a llamar a mi API y va a crear una mesa
    def post(self, request):
        data = request.data
        serializer = MesaSerializer(data=data)
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
        mesa = Mesa.objects.filter(pk=pk)
        serializer = MesaSerializer(data=data)
        if serializer.is_valid():
            mesa.update(**serializer.validated_data)
            return Response({
                "ok" : True
            })
        else:
            return Response({
                "errors": serializer.errors
            })
    
    #DELETE : BORRAR
    def delete(self, request, pk=None):
        mesa = Mesa.objects.filter(pk=pk)
        mesa.delete()
        return Response({
            "ok" : True
        })

        






