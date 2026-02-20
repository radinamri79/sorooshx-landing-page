from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BlogViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r"blogs", BlogViewSet, basename="blog")
router.register(r"categories", CategoryViewSet, basename="category")

urlpatterns = [
    path("", include(router.urls)),
]
