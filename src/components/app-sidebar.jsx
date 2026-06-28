"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  History  ,
  Home
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {

  
  teams: [
    {
      name: "ResumeSync",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: Home,
      isActive: true,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Resumes",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Roast My Resume",
          url: "#",
        },
        {
          title: "Build Resume",
          url: "#",
        },
        {
          title: "Available Templates",
          url: "#",
        },
      ],
    },
    {
      title: "Email",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Genrate Email",
          url: "#",
        },
        {
          title: "Saved Templates",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Get user data from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          // Map the user data to match the expected format
          setUser({
            name: userData.username || userData.name,
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar || null,
          })
        } catch (err) {
          console.error("Error parsing user data:", err)
        }
      }
    }
  }, [])

  // Listen for storage changes (e.g., when user logs in/out in another tab)
  // Also listen for custom events for same-tab updates
  useEffect(() => {
    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser)
            setUser({
              name: userData.username || userData.name,
              username: userData.username,
              email: userData.email,
              avatar: userData.avatar || null,
            })
          } catch (err) {
            console.error("Error parsing user data:", err)
          }
        } else {
          setUser(null)
        }
      }
    }

    // Listen for storage events (other tabs)
    window.addEventListener("storage", handleStorageChange)
    // Listen for custom events (same tab)
    window.addEventListener("userUpdated", handleStorageChange)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("userUpdated", handleStorageChange)
    }
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
