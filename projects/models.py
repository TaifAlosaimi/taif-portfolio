
from django.db import models


class Project(models.Model):
    title_en = models.CharField(max_length=200)
    title_ar = models.CharField(max_length=200)

    description_en = models.TextField()
    description_ar = models.TextField()

    image_one = models.ImageField(upload_to="projects/")
    image_two = models.ImageField(upload_to="projects/")

    display_order = models.PositiveIntegerField(default=0)
    project_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["display_order", "id"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return self.title_en
