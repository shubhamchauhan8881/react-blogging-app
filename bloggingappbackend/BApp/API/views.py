from . import models
from . import serializer
from rest_framework import status
from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import authentication, permissions, generics
from rest_framework_simplejwt.authentication import JWTAuthentication

class BlogsCategoryView(generics.ListAPIView):
    queryset = models.BlogsCategory.objects.all()
    serializer_class =serializer.BlogsCategorySerializer
    permission_classes = [permissions.AllowAny]


class Blogs(generics.ListAPIView, generics.CreateAPIView):
    queryset = models.BlogsModel.objects.all().order_by('-timeCreated')
    serializer_class = serializer.BlogsSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = [JWTAuthentication]


class FilterBlogs(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, name):
        if name == 'most-liked':
            queryset = models.BlogsModel.objects.all().order_by('-likes_count')
            sr = serializer.BlogsSerializer(queryset, many=True)
            return Response(sr.data, status=status.HTTP_200_OK, content_type="application/json")
        
        # elif name == 'technical':


class CommentView(generics.ListCreateAPIView):
    queryset = models.Comment.objects.all()
    serializer_class = serializer.CommentSerializer
    permission_classes = [permissions.AllowAny]


class Register(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = serializer.RegisterUserSerializer( data=request.data)
        if data.is_valid(raise_exception=True):
            data.save()
            return Response(data=data.data, content_type='application/json')
        else:
            sleep(10)
            return Response(data=data.errors, content_type='application/json')


class UserNotifications(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    serializer_class = serializer.NotificationSerializer
    queryset = models.Notifications.objects.all()


class BlogsOfUser(APIView):

    permission_classes = [permissions.AllowAny]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        try:
            blogs  = models.BlogsModel.objects.filter(user=request.user)
            serialized_data = serializer.BlogsSerializer(blogs, many=True)
            return Response(data={"ok":True, "data":serialized_data.data})
        except ObjectDoesNotExist:
            return Response(data={"ok":False,"message":"No record found realted to provided user details"})


class UserFavorites(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        queryset = models.Like.objects.filter(by=request.user.id)

        if queryset.count() <= 0:
            return Response(status=status.HTTP_204_NO_CONTENT, data={"message":"No records found"})

        blogs = [b.blog for b in queryset]
        sr  = serializer.BlogsSerializer(blogs, many=True)
        return Response(data={'blogs':sr.data})

class UpdateBlogLikes(APIView):

    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, blogid):
        try:
            b = models.BlogsModel.objects.get(id=blogid)
            

            if not models.Like.objects.filter(by=request.user, blog = b).exists():
                b.likes_count += 1
                b.save()
            
                models.Like.objects.create(
                    by= request.user,
                    blog = b
                )
            # add notification for the user whose post was liked...
            models.Notifications.objects.create(
                user=b.user,
                message= f"You liked your blog titled {b.title}" if request.user == b.user else f"{request.user.get_full_name()} liked your blog titled {b.title}"
            )

            data={"ok":True, "likes_count": b.likes_count}
        except Exception as e:
            data={"ok":False}
        finally:
            return Response(data, status=status.HTTP_200_OK, content_type='application/json')
        
    def get(self, request, blogid):
        b = models.BlogsModel.objects.get(id=blogid)

        if models.Like.objects.filter(by=request.user, blog = b).exists():
            data={"ok":True}
        else:
            data={"ok":False}
        return Response(data, status=status.HTTP_200_OK, content_type='application/json')
    
    def delete(self, request, blogid):
        b = models.BlogsModel.objects.get(id=blogid)
        l = models.Like.objects.filter(by=request.user, blog = b)

        if l:
            l.delete()
            b.likes_count -= 1
            b.save()
            data={"ok":True, "likes_count":b.likes_count}
        else:
            data={"ok":False}
        return Response(data, status=status.HTTP_200_OK, content_type='application/json')