# Generated by Django 3.2.9 on 2021-11-25 17:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('project', '0003_auto_20211125_2029'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='project',
        ),
        migrations.AddField(
            model_name='todo',
            name='project',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='project.project'),
            preserve_default=False,
        ),
    ]
