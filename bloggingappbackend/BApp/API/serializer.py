from rest_framework import serializers
from . import models
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from . import models
from rest_framework.exceptions import ValidationError


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        person = models.Person.objects.get(user=user)

        token['fname'] = user.first_name
        token['lname'] = user.last_name
        token['email'] = user.username
        token['phone'] = person.phone
        token['about'] = person.about
        
        return token


class BlogsCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BlogsCategory
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class BlogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BlogsModel
        fields  = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Comment
        fields = '__all__'

class RegisterUserSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=50, required=True)
    last_name = serializers.CharField(max_length=50, required=True)

    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}

    def get_phone(self, obj):return obj.phone

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        models.Person.objects.create(user=user)
        return user


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notifications
        fields = "__all__"