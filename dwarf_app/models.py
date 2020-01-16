from __future__ import unicode_literals
from django.db import models 
from django.utils import timezone 
from django.contrib.auth.models import User

class Event(models.Model): 
    title = models.CharField(max_length=250) 
    author = models.ForeignKey(User, 
                               on_delete=models.CASCADE, 
                               related_name='events') 
    description = models.TextField()
    start = models.DateTimeField()
    end = models.DateTimeField()

    class Meta: 
        ordering = ('-start',) 

    def __str__(self): 
        return self.title

