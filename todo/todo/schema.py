import graphene
from graphene import ObjectType
from graphene_django import DjangoObjectType
from project.models import Project, Todo
from users.models import Users


# class Query(graphene.ObjectType):
#     hello = graphene.String(default_value="Hi!")
#
# schema = graphene.Schema(query=Query)

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = ('name', 'users')


class UsersType(DjangoObjectType):
    class Meta:
        model = Users
        fields = ('username',)


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = ('project', 'id', 'text')


class Query(graphene.ObjectType):
    all_project = graphene.List(ProjectType)
    all_users = graphene.List(UsersType)
    all_todo = graphene.List(TodoType)

    def resolve_all_project(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return Users.objects.all()

    def resolve_all_todo(root, info):
        return Todo.objects.all()

    # {
    #   allTodo{
    #     id,
    #     text,
    #     project{
    #       name,
    #       users{
    #         username
    #       }
    #     }
    #   }
    # }

    users_by_project_name = graphene.List(UsersType, name=graphene.String(required=False))

    def resolve_users_by_project_name(self, info, name=None):
        users = Users.objects.all()
        if name:
            users = users.filter(project__name=name)
        return users

    # {
    #   usersByProjectName(name: "1") {
    # 	username
    #   }
    # }


schema = graphene.Schema(query=Query)
