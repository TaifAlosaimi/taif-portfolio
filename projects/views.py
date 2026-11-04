from django.db.models import F
from rest_framework.generics import ListAPIView

from .models import Project
from .serializers import ProjectSerializer


class ProjectListAPIView(ListAPIView):
    queryset = Project.objects.order_by(
        F("project_date").desc(nulls_last=True),
        "display_order",
        "id",
    )
    serializer_class = ProjectSerializer
