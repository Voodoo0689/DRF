from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Users

class UsersModelSerializer(ModelSerializer):

    class Meta:
        model = Users
        fields = ('username',
                  'first_name',
                  'last_name',
                  'email')
