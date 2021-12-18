import mixer
from django.test import TestCase
import json
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from project.models import Project, Todo
from .views import UsersModelViewSet


# from .models import Author, Book

class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'
        self.token = {'token': '4b136bf81e99d8c2b010b820c73b6ac848051cf5'}
        self.data = {
            "username": "gav",
            "first_name": "Art",
            "last_name": "Gavr",
            "email": "vooo06.89@mail.ru"
        }

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = UsersModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_guest(self):
        client = APIClient()
        user = User.objects.create(**self.data)
        response = client.get(f'{self.url}{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_admin(self):
        user = User.objects.create(username='Push', email='qwe@qw.ru')
        client = APIClient()
        admin = User.objects.create_superuser('admin', 'admin@admin.com', '123')
        client.login(username='admin', password='123')
        response = client.put(f'/api/users/{user.id}/', {'username': 'Pupkin', 'email': 'qwe@qw.ru'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        user = User.objects.get(id=user.id)
        self.assertEqual(user.username, 'Push')
        self.assertEqual(user.email, 'qwe@qw.ru')
        client.logout()

    def tearDown(self) -> None:
        pass


class TestViewSet(APITestCase):

    def setUp(self) -> None:
        self.url = '/api/users/'

    def get_test_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        todo = mixer.blend(Todo, text='Foo')
        response = self.client.get(f'/api/todo/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_book = json.loads(response.content)
        self.assertEqual(response_book['text'], 'Foo')

    def test_get_detail_todo(self):
        todo = mixer.blend(Todo, project__name='Green')
        response = self.client.get(f'/api/todo/{todo.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_todo = json.loads(response.content)
        self.assertEqual(response_todo['project']['name'], 'Green')
