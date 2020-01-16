from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Event, User

@admin.register(Event)  
class EventAdmin(admin.ModelAdmin):  
    list_display = ('id', 'title', 'author', 'start', 'end')
    list_filter = ('author', 'start', 'end')  
    search_fields = ('title', 'description', 'start', 'end')  
    prepopulated_fields = {}  
    raw_id_fields = ('author',)  
    date_hierarchy = 'start'  
    ordering = ('start', 'end')