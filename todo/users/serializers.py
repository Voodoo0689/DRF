from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import Users


class UsersModelSerializer(ModelSerializer):
    class Meta:
        model = Users
        # fields = '__all__'
        fields = ('id',
                  'username',
                  'first_name',
                  'last_name',
                  'email',
                  )


class UserSerializerAugmented(ModelSerializer):
    class Meta:
        model = Users
        fields = ('id',
                  'username',
                  'first_name',
                  'last_name',
                  'email',
                  'is_superuser',
                  'is_staff',
                  )
