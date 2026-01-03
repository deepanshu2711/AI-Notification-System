'use client'

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
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <>
      <SidebarLayout
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <SidebarLabel className={'text-white'}>
                <div className="item-center flex justify-center">
                  {/* <img src={'/brain.png'} width={30} height={30} alt="logo" /> */}
                  <span>AI Notification System</span>
                </div>
              </SidebarLabel>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                <SidebarItem href="/dashboard" current={pathname === '/dashboard'}>
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/projects" current={pathname === '/dashboard/projects'}>
                  <InboxIcon />
                  <SidebarLabel>Projects</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/templates" current={pathname === '/dashboard/templates'}>
                  <DocumentIcon />
                  <SidebarLabel>Templates</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/api" current={pathname === '/dashboard/api'}>
                  <KeyIcon />
                  <SidebarLabel>API Keys</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/logs" current={pathname === '/dashboard/logs'}>
                  <ClipboardIcon />
                  <SidebarLabel>Logs</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="/dashboard/settings" current={pathname === '/dashboard/settings'}>
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
