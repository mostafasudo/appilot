import { describe, expect, it } from "@jest/globals"

import { configureApiClient } from "@/api/client"
import { buildCodingAgentPrompt, buildWidgetTokenRefreshPrompt, getIntegrationDocUrl, maskApiKey } from "./agent-integration"

describe("agent integration helpers", () => {
  it("builds the public manual url from the api base url", () => {
    configureApiClient({ apiUrl: "https://api.appilot.ai", apiTimeoutMs: 1000 })
    expect(getIntegrationDocUrl()).toBe("https://api.appilot.ai/static/integrate-appilot.md")
  })

  it("masks api keys by last four", () => {
    expect(maskApiKey("1234")).toBe("••••••••••••1234")
  })

  it("builds the coding agent prompt", () => {
    configureApiClient({ apiUrl: "https://api.appilot.ai", apiTimeoutMs: 1000 })
    const prompt = buildCodingAgentPrompt("wrk_test_1234")
    expect(prompt).toBe(
      "Fetch https://api.appilot.ai/static/integrate-appilot.md and follow the instructions to integrate Appilot into this project. My API key is: wrk_test_1234"
    )
  })

  it("builds the widget token refresh prompt", () => {
    const prompt = buildWidgetTokenRefreshPrompt("https://api.appilot.ai", "/widget-token")
    expect(prompt).toContain("POST /widget-token")
    expect(prompt).toContain("POST https://api.appilot.ai/widget-token Authorization: Bearer <APPILOT_API_KEY>")
  })
})
