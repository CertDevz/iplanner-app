'use client'

import { BarChart, Compass, Layout, List, Ticket } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { SidebarItem } from './sidebar-item'

const guestRoutes = [
  {
    icon: Layout,
    label: 'Inicio',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Pesquisar',
    href: '/search',
  },
  {
    icon: Ticket,
    label: 'Evento',
    href: '/event'
  }
]

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname()

  const isTeacherPage = pathname?.startsWith('/teacher')

  const routes = isTeacherPage ? teacherRoutes : guestRoutes
  return (
    <div className="flex w-full flex-col">
      {routes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  )
}
