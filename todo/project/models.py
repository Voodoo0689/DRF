from users.models import Users
from django.db import models


class Project(models.Model):
    users = models.ManyToManyField(Users)
    name = models.CharField(max_length=128)
    link = models.URLField()

    def __str__(self):
        return f'{self.name}'


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField(max_length=1024)
    date = models.DateTimeField()
    create_user = models.ForeignKey(Users, on_delete=models.CASCADE)
    is_active = models.BooleanField()
