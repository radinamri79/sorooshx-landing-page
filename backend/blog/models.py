import io
from django.db import models
from django.conf import settings
from django.core.files.base import ContentFile
from slugify import slugify
from PIL import Image


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=120, unique=True, blank=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


def blog_image_path(instance, filename):
    ext = filename.rsplit(".", 1)[-1].lower() if "." in filename else "jpg"
    return f"blogs/{instance.slug}.{ext}"


class Blog(models.Model):
    COLOR_CHOICES = [
        ("#2563EB", "Blue"),
        ("#F97316", "Orange"),
    ]

    title = models.CharField(max_length=300)
    slug = models.SlugField(max_length=350, unique=True, blank=True)
    author = models.CharField(max_length=150, default="soroush osivand")
    author_href = models.URLField(max_length=500, blank=True, default="#")
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="blogs",
    )
    color = models.CharField(max_length=7, choices=COLOR_CHOICES, default="#2563EB")
    image = models.ImageField(upload_to=blog_image_path, blank=True, null=True)
    content = models.TextField()
    description = models.TextField(
        blank=True,
        help_text="Short excerpt for blog cards (auto-generated from content if blank)",
    )
    published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.title)
            slug = base
            counter = 1
            while Blog.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug

        if not self.description and self.content:
            self.description = self.content[:200].strip()

        super().save(*args, **kwargs)

        # Auto-resize uploaded image
        if self.image:
            self._resize_image()

    def _resize_image(self):
        try:
            img = Image.open(self.image.path)
            max_w = settings.BLOG_IMAGE_MAX_WIDTH
            max_h = settings.BLOG_IMAGE_MAX_HEIGHT

            if img.width > max_w or img.height > max_h:
                img.thumbnail((max_w, max_h), Image.LANCZOS)
                buffer = io.BytesIO()
                fmt = "JPEG" if self.image.name.lower().endswith((".jpg", ".jpeg")) else "PNG"
                quality = settings.BLOG_IMAGE_QUALITY if fmt == "JPEG" else None
                save_kwargs = {"format": fmt}
                if quality:
                    save_kwargs["quality"] = quality
                img.save(buffer, **save_kwargs)
                self.image.save(
                    self.image.name.split("/")[-1],
                    ContentFile(buffer.getvalue()),
                    save=False,
                )
                Blog.objects.filter(pk=self.pk).update(image=self.image.name)
        except (FileNotFoundError, OSError):
            pass

    @property
    def formatted_date(self):
        return self.created_at.strftime("%b %d %Y").lower()

    @property
    def category_name(self):
        return self.category.name if self.category else "uncategorized"

    @property
    def category_slug(self):
        return self.category.slug if self.category else "uncategorized"
