
from rest_framework import views
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenViewBase
from rest_framework import status
from .serializers import UserRegisterSerializer, UserObtainPairSerializer
from ..models import UserData


class UserApiView(views.APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request, pk=None):
        user = UserData.objects.get(pk=pk)
        serializer = UserRegisterSerializer(user)
        return Response({"data": serializer.data})


class UserTokenObtainPairView(TokenViewBase):
    serializer_class = UserObtainPairSerializer
