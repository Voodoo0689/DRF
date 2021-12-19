# Generated by Django 3.2.9 on 2021-11-25 17:47

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('project', '0005_auto_20211125_2040'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='project',
            name='users',
        ),
        migrations.AddField(
            model_name='project',
            name='users',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
