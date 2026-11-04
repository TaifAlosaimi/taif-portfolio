
from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title_en",
        "title_ar",
        "display_order",
    )

    list_editable = ("display_order",)

    search_fields = (
        "title_en",
        "title_ar",
        "description_en",
        "description_ar",
    )

    ordering = ("display_order",)
