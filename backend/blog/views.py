from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from auth_api.permissions import IsAdminAuthenticated
from .models import Blog, Category
from .serializers import BlogListSerializer, BlogDetailSerializer, CategorySerializer


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.select_related("category").all()
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["title", "author", "content", "category__name"]
    ordering_fields = ["created_at", "title"]
    ordering = ["-created_at"]

    def get_serializer_class(self):
        if self.action == "list":
            return BlogListSerializer
        return BlogDetailSerializer

    def get_permissions(self):
        if self.action in ("list", "retrieve", "published", "by_slug"):
            return [AllowAny()]
        return [IsAdminAuthenticated()]

    def get_queryset(self):
        qs = super().get_queryset()
        # Filter by category slug
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category__slug=category)
        # Filter by published status
        published = self.request.query_params.get("published")
        if published is not None:
            qs = qs.filter(published=published.lower() in ("true", "1"))
        return qs

    def get_paginate_queryset(self, queryset):
        # Allow page_size override via query param
        page_size = self.request.query_params.get("page_size")
        if page_size and page_size.isdigit():
            self.paginator.page_size = int(page_size)
        return super().paginate_queryset(queryset)

    def paginate_queryset(self, queryset):
        page_size = self.request.query_params.get("page_size")
        if page_size and page_size.isdigit():
            self.paginator.page_size = int(page_size)
        return super().paginate_queryset(queryset)

    @action(detail=False, methods=["get"], url_path="by-slug/(?P<slug>[^/.]+)")
    def by_slug(self, request, slug=None):
        """Fetch a single blog by its slug."""
        try:
            blog = Blog.objects.select_related("category").get(slug=slug)
        except Blog.DoesNotExist:
            return Response(
                {"error": "Blog not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
        serializer = BlogDetailSerializer(blog, context={"request": request})
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in ("list", "retrieve"):
            return [AllowAny()]
        return [IsAdminAuthenticated()]
