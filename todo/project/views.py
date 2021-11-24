from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Todo, Project
from .serializers import TodoModelSerializer, ProjectModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
