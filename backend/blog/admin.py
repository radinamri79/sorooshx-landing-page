from django.contrib import admin
from .models import Blog, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "category", "published", "created_at"]
    list_filter = ["published", "category", "created_at"]
    search_fields = ["title", "author", "content"]
    prepopulated_fields = {"slug": ("title",)}
