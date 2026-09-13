from fastapi import APIRouter, Request
from fastapi.responses import PlainTextResponse

from ..services.integrate_appilot_doc_service import build_integrate_appilot_markdown

router = APIRouter()


@router.get("/static/integrate-appilot.md", include_in_schema=False)
def read_integrate_appilot_doc(request: Request) -> PlainTextResponse:
    content = build_integrate_appilot_markdown(request.app.openapi())
    return PlainTextResponse(content, media_type="text/markdown")
