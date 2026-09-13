# Appilot.ai: Brand & Product Strategy

> "Jarvis for your dashboard."

## 1. Branding Guidelines

**Brand Archetype: The Adaptive Architect**  
Appilot is a precision engine, not a chatty assistant. It combines the visionary capability of The Magician (generating UI from nothing) with the structural rigor of The Sage (analyzing deep data).

**Vibe:** Futuristic, advanced tech—instrument flight and autopilot. Appilot takes the controls and flies the user straight to the outcome.

### Core Values & Tone

- **Minimal Intrusion:** The widget must be as vanilla and minimal as possible. It must avoid being invasive to the user's dashboard and styling. Appilot overlays, morphs, and acts, but never disrupts or overwrites the host product experience.
- **End-User Simplicity:** Anything surfaced to end users (our customers' users) must be extremely simple and non-technical—no jargon.
- **Host Design Inheritance:** We use as much as possible from the existing customer host page. Infer their design tokens—fonts, colors, spacing—and reuse them so the widget feels native to the dashboard.
- **Visual-First Communication:** Prefer universally legible visual cues over English text in widget chrome. If a state can be communicated clearly through iconography, motion, spacing, color, or shape, use that before labels.
- **Fluidity:** The interface is liquid. It morphs to fit the data, rejecting static grids.
- **Invisibility:** Appilot is unobtrusive. It is a lens, not a wall. It waits for intent, then acts instantly.
- **Precision:** We speak the language of developers and analysts. No fluff. High signal-to-noise ratio.

**Voice:** Technical Co-Pilot.

- **Do:** Use active verbs ("Morph," "Generate," "Synthesize"). Speak in concise, data-driven statements.
- **Don't:** Use anthropomorphic language ("I think," "Here's a helper"). Avoid playful or cartoony slang.

### Visual Style Guide: "The Flight Deck" & "The Laboratory"

**Dark Mode (Primary):** "Deep Gunmetal." Avoid pure black. Use a "luminance staircase" of deep, slate-tinted greys to create depth without harsh borders.

**Light Mode (Secondary):** "The Laboratory." A sterile, high-exposure engineering environment. Signal white backgrounds with "Vapor Grey" surfaces and sharp, deep gunmetal text.

**Logo Usage:**

- **Primary:** White mark on Deep Gunmetal.
- **Motion:** The mark should drift slightly, like an instrument needle holding a heading—never remaining perfectly static.

## 2. Catchy Brand Statements

### Primary Slogan:

> "Jarvis for your dashboard."

### Secondary Taglines:

- "Put your dashboard on autopilot."
- "Static is Dead. Go Fluid."
- "Your Dashboard, Unlocked."
- "From Read-Only to Real-Time."

## 3. Core Product Design Guidelines

> **Minimal, non-invasive widget:** Above all, Appilot’s widget must remain as minimal and vanilla as possible, leaving the user’s dashboard styling untouched and providing functional overlays only when necessary.

### Design System Tokens

#### Palette: The Instrument System (Refined)

**Surfaces (Dark Mode - The Staircase):**
- `#090a0b` Night Deck (Main Background - L4%)
- `#121416` Gunmetal Surface (Cards - L8%)
- `#1b1e22` Active Layer (Inputs/Muted - L12%)
- `#23262b` Stealth Border (Borders - L16%)

**Accents & Semantics:**
- **Primary:** Heading Blue (HSL 215 100% 50%). A heavier, authoritative electric blue that anchors the UI.
- **Secondary:** Instrument Grey (HSL 217 19% 27%). A subtle technical grey for tags and secondary actions. Do not use Violet here.
- **AI Glow:** Generative Violet (HSL 255 60% 65%). Reserved exclusively for AI-generated elements and magic moments. Never used for standard UI buttons.

#### Typography: The Unified Stack

- **Headlines & UI:** Space Grotesk. A geometric sans-serif that maintains a professional, "invisible" structural feel with a futuristic edge. Tight tracking (-0.025em) enhances its modern, technical character.
- **Code/Data:** JetBrains Mono. Used strictly for code blocks, JSON payloads, and technical values.

#### Border Radius

- **Pill (999px):** For the collapsed "Beacon" widget and primary buttons.
- **Standard (8px):** For cards, inputs, and detached windows.

### UI/UX Design Principles

#### 1. The Luminance Staircase

Never use high-contrast borders to separate layers in dark mode. Instead, use 4% increments in lightness (4% → 8% → 12%) to create a "staircase" of depth. This prevents the "Grid Prison" effect and reduces eye strain.

#### 2. Semantic Attention Economy

Color indicates function, not just brand.

- Blue = User Action (Save, Submit, Navigate).
- Violet = AI Action (Generate, Morph, Analyze).
- Grey = Meta Information (Tags, Secondary options).

#### 3. Polymorphic Interface (States of Matter)

- **Solid:** The collapsed "Beacon" (a small, glowing pill).
- **Liquid:** The expanded "Command Center" (flows over the content).
- **Gas:** Detached "Projections" (floating windows pinned to the dashboard).

#### 4. Skeleton Morphing

Never use spinning loaders. When a user requests a UI element, the widget immediately expands to the predicted size of the result and fills with a shimmering skeleton. This reduces perceived latency.

#### 5. The Spotlight Effect

When discussing specific data, Appilot dims the host dashboard (30% opacity) and highlights the specific DOM element (chart or table) with a Heading Cyan border, drawing a bezier curve connecting the chat to the data.
