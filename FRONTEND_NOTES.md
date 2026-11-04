# Portfolio Frontend — implementation notes

## What was added
- A Django homepage view and route at `/`.
- A single-page template with Hero, About, Tracks, Projects, and Contact sections.
- Responsive CSS, reveal-on-scroll interactions, a language toggle, and an API-powered project timeline.
- A short, silent, compressed Hero video and poster image.
- Supplied TA monogram, DST visuals, Asir360 prepared assets, and the supplied CV PDF.

## Existing backend
The `Project` model, serializer, API view, API URL, migrations, and SQLite database were preserved.
The Projects section reads `/api/projects/`; it does not contain hard-coded project records.

## Run locally
1. Activate the existing virtual environment.
2. Run `python manage.py check`.
3. Run `python manage.py runserver`.
4. Open `http://127.0.0.1:8000/`.
5. Open `/api/projects/` to inspect the API and `/admin/` to manage projects.

## Project images
The two existing database image fields are used by the timeline. The API returns image paths; development media serving is enabled only when `DEBUG=True`.

## Important current-data note
The supplied database currently contains one test Project record titled `taif`. It was intentionally preserved. Add or edit the real portfolio projects through Django Admin before judging the final project copy and ordering.

## Hero video note
The supplied source clip is 910x512. A 14-second silent loop was prepared at 1280x720 for web delivery. This is an upscale for layout compatibility, not recovery of original missing detail. Replace it with a true 1080p/4K source if one becomes available.

## Before public deployment
- Move `SECRET_KEY` out of source code and rotate it because the uploaded project archive contained a development secret key.
- Set `DEBUG=False`, configure `ALLOWED_HOSTS`, and configure production static/media hosting.
- Confirm commercial-use permission for the Hero video from its original source/license terms.
