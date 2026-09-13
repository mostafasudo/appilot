from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
INTERNAL_FRONTEND_DOC = ROOT / "docs" / "frontend-agent.md"


def test_internal_frontend_agent_doc_keeps_route_ownership_note() -> None:
    content = INTERNAL_FRONTEND_DOC.read_text(encoding="utf-8")

    assert "## Route ownership" in content
    assert "GET /widget/config/{agentId}" in content
    assert "WS /widget/session" in content
    assert "POST /widget/transcribe" in content
