import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SIDEBAR_LINKS } from "@/lib/contants"
import { cn } from "@/lib/utils"
import { AppWindowIcon, EqualApproximatelyIcon } from "lucide-react"
import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

export function AppSidebar() {

  const location = useLocation()

  useEffect(() => {
    console.log(location.pathname);
  }, [])

  return (
    <Sidebar>
      <SidebarHeader className=""> app</SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="list-none flex flex-col gap-2">
          {SIDEBAR_LINKS.map((link) => (
            <SidebarMenuItem key={link.url}>
              <Link to={link.url}

                className={cn({
                  "flex items-center gap-2 transition hover:text-black hover:bg-gray-300 rounded p-2": true,
                  "text-black bg-gray-400": link.url === location.pathname
                })}

              >
                <link.icon /> {link.title}
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
