from django.contrib import auth
from django.http.response import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from core.models import User
#Método para hacer el login de forma manual
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


#creamos una vista de API, vista que gestiona las peticiones tipo POST

class CustomObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["usu_tipo"] = user.usu_tipo
        return token

class LoginAPI(APIView):

    def post(self, request):
        data = request.data
        #De la nueva data que le envían a mi API quiero extraer correo y contraseña, 
        # buscar un usuario cuyo correo sea igual al que me acaban de pasar y si todo està
        #ok pasamos a la siguiente fase

        email = data["correo"]
        password = data["password"]

        #Debo buscar si el usuarioe existe
        user = User.objects.filter(email__exact=email).first()
        #Autenticar al usuario, método authenticate
        user_authenticated = authenticate(username=user.username, password=password)

        if user_authenticated != None:
            #si todo està ok genero un token

            #token = RefreshToken.for_user(user_authenticated)
            #cambio la generación de token por uno personalizado
            token = CustomObtainPairSerializer.get_token(user_authenticated)

            #retorna la herramienta de AccesToken (JWT)
            return Response({
                'ok':True,
                'token' : str(token.access_token)
            })

            return HttpResponse("Error")

