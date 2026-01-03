import { ClipboardIcon } from '@/components/icons/clipboard-icon'
import { CogIcon } from '@/components/icons/cog-icon'
import { DocumentIcon } from '@/components/icons/document-icon'
import { HomeIcon } from '@/components/icons/home-icon'
import { InboxIcon } from '@/components/icons/inbox-icon'
import { KeyIcon } from '@/components/icons/key-icon'
import { Navbar } from '@/components/typescript/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/typescript/sidebar'
import { SidebarLayout } from '@/components/typescript/sidebar-layout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarLayout
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <SidebarLabel>Dashboard</SidebarLabel>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                <SidebarItem href="/dashboard" current>
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/projects">
                  <InboxIcon />
                  <SidebarLabel>Projects</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/templates">
                  <DocumentIcon />
                  <SidebarLabel>Templates</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/api">
                  <KeyIcon />
                  <SidebarLabel>API Keys</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/logs">
                  <ClipboardIcon />
                  <SidebarLabel>Logs</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/settings">
                  <CogIcon />
                  <SidebarLabel>Settings</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>
          </Sidebar>
        }
        navbar={<Navbar />}
      >
        {children}
      </SidebarLayout>
    </>
  )
}
