import type { ComponentType } from "react"
import type { AppilotOutputComponent } from "../core/mountWidget"

export type AppilotReactOutputComponent =
  | AppilotOutputComponent
  | {
      key: string
      version?: string
      component: ComponentType<Record<string, unknown>>
    }

export type WidgetProps = {
  agentId: string
  baseUrl?: string
  scriptSrc: string
  containerId?: string
  components?: AppilotReactOutputComponent[]
}

export declare function Widget(props: WidgetProps): null
