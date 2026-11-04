
from django.contrib import admin
from django.db.models import F
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title_en",
        "title_ar",
        "project_date",
        "display_order",
    )

    list_editable = ("display_order",)

    search_fields = (
        "title_en",
        "title_ar",
        "description_en",
        "description_ar",
    )

    ordering = (F("project_date").desc(nulls_last=True), "display_order", "id")
