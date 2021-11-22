from users.models import Users
from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=128)
    link = models.URLField()
    users = models.ManyToManyField(Users)

    def __str__(self):
        return f'{self.name}'


class Todo(models.Model):
    project = models.ManyToManyField(Project)
    text = models.TextField(max_length=1024)
    date = models.DateTimeField()
    create_user = models.OneToOneField(Users, on_delete=models.CASCADE)
    is_active = models.BooleanField()
