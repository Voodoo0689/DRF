from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from .filters import ProjectFilter
from .models import Todo, Project
from .serializers import TodoModelSerializer, ProjectModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(viewsets.ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter

    # При фильтрации выдаёт пустой список. Не понял почему.
    # def get_queryset(self):
    #     name = self.request.query_params.get('name', '')
    #     project = Project.objects.all()
    #     if name:
    #         project = project.filter(name__contains='name')
    #     return project


class TodoModelViewSet(viewsets.ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoLimitOffsetPagination
    filterset_fields = ['project']

    def destroy(self, request, pk=None, *args, **kwargs):
        todo = get_object_or_404(Todo, pk=pk)
        data = {'is_active': False}
        serializer = TodoModelSerializer(todo, data=data, partial=True)
        serializer.is_valid()
        serializer.save()
        return Response(serializer.data)
