# `@appilot-ai/widget`

[![npm](https://img.shields.io/npm/v/%40appilot-ai%2Fwidget?label=npm)](https://www.npmjs.com/package/@appilot-ai/widget)

Tiny, framework-agnostic loader for the Appilot embeddable widget.

This package **does not bundle the widget UI**. It simply injects the Appilot widget `<script>` (`widget.js`) and passes configuration via `data-*` attributes.

## Install

```bash
npm i @appilot-ai/widget
# or
pnpm add @appilot-ai/widget
# or
yarn add @appilot-ai/widget
```

## Quick start (vanilla)

```ts
import { mountWidget } from "@appilot-ai/widget"

const widget = mountWidget({
  agentId: "YOUR_AGENT_UUID",
  baseUrl: "https://YOUR_DASHBOARD_BASE_URL/",
  scriptSrc: "https://cdn.appilot.ai/widget.js",
  components: [
    {
      key: "invoice_summary",
      version: "1",
      render({ mount, props }) {
        mount.textContent = String(props.content || "")
      }
    }
  ]
})

// later
widget.unmount()
```

## React

```tsx
import { Widget } from "@appilot-ai/widget/react"

export function App() {
  return (
    <Widget
      agentId="YOUR_AGENT_UUID"
      baseUrl="https://YOUR_DASHBOARD_BASE_URL/"
      scriptSrc="https://cdn.appilot.ai/widget.js"
      components={[
        { key: "invoice_summary", version: "1", component: InvoiceSummary }
      ]}
    />
  )
}
```

## Vue

```vue
<script setup lang="ts">
import { Widget } from "@appilot-ai/widget/vue"
</script>

<template>
  <Widget
    agentId="YOUR_AGENT_UUID"
    scriptSrc="https://cdn.appilot.ai/widget.js"
    :components="[
      { key: 'invoice_summary', version: '1', component: InvoiceSummary }
    ]"
  />
</template>
```

## Svelte

```svelte
<script>
  import Widget from "@appilot-ai/widget/svelte"
</script>

<Widget
  agentId="YOUR_AGENT_UUID"
  scriptSrc="https://cdn.appilot.ai/widget.js"
  components={[{ key: "invoice_summary", version: "1", component: InvoiceSummary }]}
/>
```

## Script tag (no package)

```html
<script
  src="https://cdn.appilot.ai/widget.js"
  data-agent-id="YOUR_AGENT_UUID"
  data-base-url="https://YOUR_DASHBOARD_BASE_URL/"
></script>
```

## Frontend-only mode (optional)

If you only use frontend actions/context tools and do not need backend endpoint tools or widget token refresh, you can omit `baseUrl`.

```ts
import { mountWidget } from "@appilot-ai/widget"

const widget = mountWidget({
  agentId: "YOUR_AGENT_UUID",
  scriptSrc: "https://cdn.appilot.ai/widget.js"
})
```

## API

### `mountWidget(options)`

`options`:

- `agentId` (required): Appilot agent UUID
- `baseUrl` (optional): your dashboard base URL (only needed when backend endpoint tools or widget token refresh must call your app backend)
- `scriptSrc` (required): URL to `widget.js` (e.g. `https://cdn.appilot.ai/widget.js`)
- `containerId` (optional): DOM id for the injected widget container
- `components` (optional): output-only native renderers keyed to the component definitions you register in Appilot

Returns:

- `{ unmount() }`: removes the injected container + script

### Native output components

Native components are optional. Use them only when the widget response mode is set to Native components in the Appilot dashboard. Each registered component must match a component definition in `/widget-components`, including its key, version, props schema, suitability guidance, and constraints. Appilot always sends a complete markdown fallback; if a native renderer is missing, the widget shows that fallback instead.

React, Vue, and Svelte wrappers can adapt framework components passed as `{ key, version, component }`. Angular and vanilla installs should pass `{ key, version, render }` and mount with the app's own lifecycle helpers.

## License

MIT
