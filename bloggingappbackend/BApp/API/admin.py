from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.BlogsModel)
admin.site.register(models.BlogsCategory)
admin.site.register(models.Person)
admin.site.register(models.Like)
admin.site.register(models.Notifications)