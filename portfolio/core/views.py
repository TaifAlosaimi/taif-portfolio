from django.shortcuts import render


def home(request):
    """Render the single-page portfolio homepage."""
    return render(request, "core/home.html")
