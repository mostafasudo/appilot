export type AppilotRenderCleanup = () => void
export type AppilotRenderResult = Node | string | void | AppilotRenderCleanup

export type AppilotOutputComponent = {
  key: string
  version?: string
  render: (context: {
    mount: HTMLElement
    props: Record<string, unknown>
    markdownFallback: string
  }) => AppilotRenderResult | Promise<AppilotRenderResult>
}

export type MountWidgetOptions = {
  agentId: string
  baseUrl?: string
  scriptSrc: string
  containerId?: string
  components?: AppilotOutputComponent[]
}

export type MountedWidget = {
  unmount: () => void
}

export declare const mountWidget: (options: MountWidgetOptions) => MountedWidget
