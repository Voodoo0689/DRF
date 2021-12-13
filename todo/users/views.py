# from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, generics
from rest_framework.generics import ListAPIView
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
# from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet, ModelViewSet

from .models import Users
from .serializers import UsersModelSerializer, UserSerializerAugmented
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, BasePermission


class StaffOnly(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff


class UsersModelViewSet(ModelViewSet):
    # renderer_classes = [JSONRenderer]
    # permission_classes = [StaffOnly]
    queryset = Users.objects.all()
    # serializer_class = UsersModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserSerializerAugmented
        return UsersModelSerializer

# class UsersModelViewSet(ViewSet):
#     permission_classes = [StaffOnly]
#     renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
#     queryset = Users.objects.all()
#     def update(self, request, pk=None, *args, **kwargs):
#         partial = kwargs.pop('partial', False)
#         user = get_object_or_404(Users, pk=pk)
#         serializer = UsersModelSerializer(user, data=request.data, partial=partial)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#
#         if getattr(user, '_prefetched_objects_cache', None):
#             # If 'prefetch_related' has been applied to a queryset, we need to
#             # forcibly invalidate the prefetch cache on the instance.
#             user._prefetched_objects_cache = {}
#
#         return Response(serializer.data)
#
#     def list(self, request):
#         users = Users.objects.all()
#         serializer = UsersModelSerializer(users, many=True)
#         return Response(serializer.data)
#
#     def retrieve(self, request, pk=None):
#         user = get_object_or_404(Users, pk=pk)
#         serializer = UsersModelSerializer(user)
#         return Response(serializer.data)
