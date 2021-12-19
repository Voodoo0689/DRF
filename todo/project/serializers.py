from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from users.serializers import UsersModelSerializer
from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    # users = UsersModelSerializer(many=True)
    class Meta:
        model = Project
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    # project = ProjectModelSerializer()
    class Meta:
        model = Todo
        fields = '__all__'
