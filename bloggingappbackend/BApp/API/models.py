from django.db import models
from django.contrib.auth.models import User

class BlogsCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name



class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="person")
    phone  = models.CharField(max_length=12)
    about = models.CharField(max_length=100)
    followers_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)

    follower = models.ManyToManyField(User, related_name="user_followers")
    following = models.ManyToManyField(User, related_name="user_following")

    def __str__(self):
        return f"{self.user.username}"

# Create your models here.
class BlogsModel(models.Model):

    timeCreated = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.TextField(max_length=2000)
    category = models.ForeignKey(BlogsCategory, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="media/uploads/blogs/", null=True, blank=True)


    likes_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    views_count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.title[:10]}..."

class Comment(models.Model):
    text = models.CharField(max_length=500)
    blog = models.ForeignKey(BlogsModel, on_delete=models.CASCADE)

class Like(models.Model):
    by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    blog = models.ForeignKey(BlogsModel, on_delete=models.CASCADE, null=True)
    date_time = models.DateTimeField(auto_now_add=True)


class Notifications(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    message = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
