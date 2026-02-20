from rest_framework import serializers
from .models import Blog, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]
        read_only_fields = ["slug"]


class BlogListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for blog listing (no full content)."""
    category_name = serializers.CharField(source="category.name", read_only=True, default="uncategorized")
    category_slug = serializers.CharField(source="category.slug", read_only=True, default="uncategorized")
    date = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            "id", "title", "slug", "author", "author_href",
            "category_name", "category_slug", "color",
            "image_url", "description", "date",
            "published", "created_at", "updated_at",
        ]

    def get_date(self, obj):
        return obj.created_at.strftime("%b %d %Y").lower()

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


class BlogDetailSerializer(serializers.ModelSerializer):
    """Full serializer including content — for detail view and create/update."""
    category_name = serializers.CharField(source="category.name", read_only=True, default="uncategorized")
    category_slug = serializers.CharField(source="category.slug", read_only=True, default="uncategorized")
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source="category", required=False, allow_null=True
    )
    date = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = [
            "id", "title", "slug", "author", "author_href",
            "category_id", "category_name", "category_slug", "color",
            "image", "image_url", "content", "description", "date",
            "published", "created_at", "updated_at",
        ]
        read_only_fields = ["slug", "created_at", "updated_at"]

    def get_date(self, obj):
        return obj.created_at.strftime("%b %d %Y").lower()

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None
