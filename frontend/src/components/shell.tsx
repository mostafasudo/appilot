import { UserButton } from "@clerk/clerk-react"
import { type ReactNode, useEffect, useState } from "react"
import { BookOpen, Braces, CreditCard, ExternalLink, LayoutDashboard, Mail, MousePointerClick, Network, PanelLeftClose, PanelLeftOpen, Smartphone, Sparkles } from "lucide-react"

import { ActionTooltip } from "@/components/action-tooltip"
import { AgentPanel } from "@/features/agent/agent-panel"
import { BillingPanel } from "@/features/billing/billing-panel"
import { DashboardPanel } from "@/features/dashboard/dashboard-panel"
import { ActivityPanel } from "@/features/activity/activity-panel"
import { ApiConfigPanel } from "@/features/api-config/api-config-panel"
import { ContactPanel } from "@/features/contact/contact-panel"
import { KnowledgeBasePanel } from "@/features/knowledge-base/knowledge-base-panel"
import { ToolsPanel } from "@/features/tools/ToolsPanel"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { navigationSelectors, useNavigationStore } from "@/stores/navigation"

type NavButtonProps = {
  active: boolean
  label: string
  icon: ReactNode
  onClick: () => void
  collapsed: boolean
}

const sectionQueryKey = "tab"
type Section = ReturnType<typeof navigationSelectors.section>
const navigationSections: Section[] = ["dashboard", "activity", "api", "features", "knowledge-base", "agent", "billing", "contact"]

const getSectionFromUrl = (): Section | null => {
  if (typeof window === "undefined") return null
  const value = new URLSearchParams(window.location.search).get(sectionQueryKey)
  if (!value) return null
  return navigationSections.includes(value as Section) ? (value as Section) : null
}

const syncSectionToUrl = (section: Section) => {
  if (typeof window === "undefined") return
  const url = new URL(window.location.href)
  if (section === "dashboard") {
    url.searchParams.delete(sectionQueryKey)
  } else {
    url.searchParams.set(sectionQueryKey, section)
  }
  window.history.replaceState(null, "", url.toString())
}

const NavButton = ({ active, label, icon, onClick, collapsed }: NavButtonProps) => {
  const button = (
    <Button
      type="button"
      variant="ghost"
      onClick={(event) => {
        onClick()
        if (event.detail > 0) {
          event.currentTarget.blur()
        }
      }}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
        collapsed ? "justify-center gap-0" : "justify-start gap-3",
        active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-muted/60 text-foreground">
        {icon}
      </span>
      <span
        className={cn(
          "whitespace-nowrap overflow-hidden transition-all duration-200",
          collapsed ? "max-w-0 opacity-0" : "max-w-[180px] opacity-100"
        )}
      >
        {label}
      </span>
    </Button>
  )

  return collapsed ? (
    <ActionTooltip content={label} side="right">
      {button}
    </ActionTooltip>
  ) : (
    button
  )
}

const MobileGuard = () => (
  <div
    data-testid="mobile-guard"
    className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background/85 px-6 backdrop-blur-lg md:hidden"
  >
    <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card/90 p-6 text-center shadow-lg">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/80 text-muted-foreground">
        <Smartphone className="h-5 w-5" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold">Use a larger screen</p>
        <p className="text-sm text-muted-foreground">
          This dashboard works best on larger screens. Switch to your laptop or desktop to continue.
        </p>
      </div>
      <p className="text-xs text-muted-foreground">You will stay signed in on this device.</p>
    </div>
  </div>
)

export const Shell = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false
    return window.matchMedia("(max-width: 767px)").matches
  })
  const [hasSyncedSection, setHasSyncedSection] = useState(false)
  const section = useNavigationStore(navigationSelectors.section)
  const sidebarCollapsed = useNavigationStore(navigationSelectors.sidebarCollapsed)
  const setSection = useNavigationStore(navigationSelectors.setSection)
  const toggleSidebarCollapsed = useNavigationStore(navigationSelectors.toggleSidebarCollapsed)

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(media.matches)
    update()
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update)
      return () => media.removeEventListener("change", update)
    }
    if (typeof media.addListener === "function") {
      media.addListener(update)
      return () => media.removeListener(update)
    }
  }, [])

  useEffect(() => {
    const sectionFromUrl = getSectionFromUrl()
    if (sectionFromUrl) {
      setSection(sectionFromUrl)
    }
    setHasSyncedSection(true)
  }, [setSection])

  useEffect(() => {
    if (!hasSyncedSection) return
    syncSectionToUrl(section)
  }, [hasSyncedSection, section])

  return (
    <div className={cn("relative min-h-screen", isMobile && "overflow-x-hidden")}>
      <div className={cn("flex", isMobile && "pointer-events-none opacity-50 blur-sm")}>
        <aside
          className={cn(
            "hidden flex-shrink-0 flex-col border-r border-border/80 bg-card/70 py-6 transition-[width] duration-300 ease-out md:sticky md:top-0 md:h-screen md:max-h-screen md:flex",
            sidebarCollapsed ? "w-20 px-2" : "w-64 px-4"
          )}
        >
          <div className={cn("flex items-center gap-3 px-2", sidebarCollapsed && "justify-center gap-0 px-0")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1024 1024"
              className="h-10 w-10 text-foreground"
              fill="currentColor"
              role="img"
              aria-label="Appilot"
            >
              <path fill="currentColor" fillOpacity="0.55" d="M 512 64 L 512 742 L 112 960 Z" />
              <path fill="currentColor" d="M 512 64 L 912 960 L 512 742 Z" />
            </svg>
            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                sidebarCollapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
              )}
            >
              <p className="text-sm font-semibold">Appilot</p>
            </div>
          </div>
          <nav className="mt-8 flex flex-col gap-2">
            <NavButton
              active={section === "dashboard"}
              label="Overview"
              icon={<LayoutDashboard className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("dashboard")}
            />
            <NavButton
              active={section === "activity"}
              label="User activity"
              icon={<MousePointerClick className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("activity")}
            />
            <NavButton
              active={section === "api"}
              label="API config"
              icon={<Braces className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("api")}
            />
            <NavButton
              active={section === "features"}
              label="Features"
              icon={<Network className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("features")}
            />
            <NavButton
              active={section === "knowledge-base"}
              label="Knowledge Base"
              icon={<BookOpen className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("knowledge-base")}
            />
            <NavButton
              active={section === "agent"}
              label="Agent"
              icon={<Sparkles className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("agent")}
            />
            <NavButton
              active={section === "billing"}
              label="Billing"
              icon={<CreditCard className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("billing")}
            />
            <NavButton
              active={section === "contact"}
              label="Get Help"
              icon={<Mail className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => setSection("contact")}
            />
          </nav>
          <div className="mt-auto flex flex-col gap-2 pt-8">
            <NavButton
              active={false}
              label="Docs"
              icon={<ExternalLink className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={() => window.open("https://docs.appilot.ai", "_blank", "noopener,noreferrer")}
            />
            <NavButton
              active={false}
              label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              icon={sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
              collapsed={sidebarCollapsed}
              onClick={toggleSidebarCollapsed}
            />
          </div>
        </aside>
        <div className="flex flex-1 flex-col gap-6 px-4 py-6 md:px-10 md:py-8">
          <header className="flex items-center justify-end gap-3">
            <ThemeToggle />
            <div className="rounded-full">
              <UserButton />
            </div>
          </header>
          {section === "dashboard" && <DashboardPanel />}
          {section === "activity" && <ActivityPanel />}
          {section === "api" && <ApiConfigPanel />}
          {section === "features" && <ToolsPanel />}
          {section === "knowledge-base" && <KnowledgeBasePanel />}
          {section === "agent" && <AgentPanel />}
          {section === "billing" && <BillingPanel />}
          {section === "contact" && <ContactPanel />}
        </div>
      </div>
      {isMobile && <MobileGuard />}
    </div>
  )
}
