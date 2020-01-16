from rest_framework import serializers
from .models import Event
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


class EventPreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'title',
            'author',
            'start',
            'end',
            'description',
            'id'
        ]

class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'id',
            'title',
            'author',
            'start',
            'end',
            'description'
        ]

class UserSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('username', 'email', 'password')
            extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            user = User(
                email=validated_data['email'],
                username=validated_data['username']
            )
            user.set_password(validated_data['password'])
            user.save()
            Token.objects.create(user=user)
            return user        