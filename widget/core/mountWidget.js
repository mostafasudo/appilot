export const mountWidget = ({ agentId, baseUrl, scriptSrc, containerId, components } = {}) => {
  if (typeof document === "undefined") {
    return { unmount: () => {} }
  }
  if (!agentId || !scriptSrc) {
    return { unmount: () => {} }
  }

  const existing = containerId
    ? document.getElementById(containerId)
    : document.querySelector('[data-appilot-widget-root="true"]')
  if (existing && existing.parentNode) {
    existing.parentNode.removeChild(existing)
  }

  const container = document.createElement("div")
  container.setAttribute("data-appilot-widget-root", "true")
  if (containerId) {
    container.id = containerId
  }
  document.body.appendChild(container)

  const script = document.createElement("script")
  script.setAttribute("data-appilot-widget-script", "true")
  script.async = true
  script.src = scriptSrc
  script.dataset.agentId = agentId
  if (Array.isArray(components)) {
    script.__appilotComponents = components
    script.addEventListener("load", () => {
      if (typeof window !== "undefined" && typeof window.appilot?.registerComponents === "function") {
        window.appilot.registerComponents(script.__appilotComponents)
      }
    }, { once: true })
  }
  if (typeof baseUrl === "string" && baseUrl.trim()) {
    script.dataset.baseUrl = baseUrl.trim()
  }
  container.appendChild(script)

  return {
    unmount: () => {
      container.remove()
    }
  }
}
