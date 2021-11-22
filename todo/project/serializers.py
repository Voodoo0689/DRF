from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer

from users.serializers import UsersModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    users = UsersModelSerializer(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
