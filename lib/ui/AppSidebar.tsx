import { SidebarFooter, Sidebar, SidebarRail, SidebarProvider, SidebarTrigger, SidebarInset, SidebarContent, SidebarGroup, SidebarHeader, SidebarGroupContent, SidebarGroupLabel, useSidebar } from "@lib/components/ui/sidebar";
import { SidebarsMenuSectionNav, NavItemType } from "./SidebarsMenuSectionNav";
import { SidebarMenuCurrentUser } from "./SidebarMenuCurrentUser";
import { AppSidebarProps } from "@lib/types";

export function AppSidebar({ children, header, side = 'left', variant = 'sidebar', footer, sectionNavItems = [] }: AppSidebarProps) {
    
    let content = <AppSidebarContent side={side} variant={variant} sectionNavItems={sectionNavItems} />
    
    return <SidebarProvider>
       {side === 'left' && content}
        <main className="flex flex-col flex-1">
            <SidebarTrigger  className={side === 'left' ? 'mr-auto' : 'ml-auto'}/>
            {children}
        </main>
        {side === 'right' && content}
    </SidebarProvider>
}

interface AppSidebarContentProps {
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    sectionNavItems: NavItemType[];
}

function AppSidebarContent({ side = 'left', variant = 'sidebar', sectionNavItems = [] }: AppSidebarContentProps) {
    const ctx = useSidebar()
    
    return <Sidebar side={side} variant={variant}>
        {variant === 'inset' && <SidebarInset />}
        <SidebarHeader>
            
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarsMenuSectionNav items={sectionNavItems} />
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenuCurrentUser />
        </SidebarFooter>
        <SidebarRail />
    </Sidebar>
}