
from rest_framework import serializers
from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project                     #يحدد ان الداتا مصدرها مودل بروجكت
        fields = [
            "id",
            "title_en",
            "title_ar",
            "description_en",
            "description_ar",
            "image_one",
            "image_two",
            "display_order",
            "project_date",
        ]
