from django.urls import path,include
from rest_framework import routers
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from rest_framework_simplejwt.views import TokenVerifyView


urlpatterns = [
    path('blogs/category/', views.BlogsCategoryView.as_view()),
    path("blogs/", views.Blogs.as_view(), name='blogs_view'),
    path("blogs/filter/<str:name>/", views.FilterBlogs.as_view(), name='blogs_view'),
    path("blogs/user/", views.BlogsOfUser.as_view()),
    path('blogs/<int:pk>/comments/', views.Blogs.as_view()),

    path("comment/", views.CommentView.as_view(), name='comment_view'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   
    path('user/register/', views.Register.as_view(), name='user_register'),
    path('user/notifications/', views.UserNotifications.as_view(), name=''),
    path('user/favorites/', views.UserFavorites.as_view(), name=''),
    path('user/liked/<int:blogid>/', views.UpdateBlogLikes.as_view(), name=''),
]
