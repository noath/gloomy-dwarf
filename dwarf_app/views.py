from django.shortcuts import render, get_object_or_404 
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import *


def index(request):
    return render(request, '../templates/index.html')

@api_view(['GET', 'POST'])
def event(req):
    if req.method == 'GET':
        events = Event.objects.all()
        serializer = EventPreviewSerializer(events, many=True)
        return Response(serializer.data)

    elif req.method == 'POST':
        serializer = EventPreviewSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'POST', 'DELETE'])
def event_detail(req, id):
    try:
        event = Event.objects.get(pk=id)
    except:
        return Response(status=404)
    
    if req.method == 'GET':
        serializer = EventDetailSerializer(event)
        return Response(serializer.data)

    elif req.method == 'POST':
        serializer = EventDetailSerializer(event, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.data, status=400)

    elif req.method == 'DELETE':
        event.delete()
        return Response(status=204)
