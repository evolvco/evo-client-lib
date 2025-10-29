import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, Collapsible, CollapsibleTrigger, CollapsibleContent } from "@lib/components/ui";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Icon } from "./Icon";
import {  NavItemType } from "@lib/types";
import { SidebarsMenuSectionNavProps } from "@lib/types";


function resolvePath(item: any): string {
    if (item.route) {
        if (item.route_params) {
            Object.keys(item.route_params).forEach((key) => {
                item.route.path = item.route.path.replace(
                    `:${key}`,
                    item.route_params[key]
                );
            });
        }
        return item.route.path;
    }
    return item.path;
}

function VO(items: NavItemType[]): NavItemType[] {
    let navItems: NavItemType[] = [];
    items.forEach((item: any) => {
        if (!item.parent) {
            navItems.push({
                ...item,
                url: resolvePath(item),
                items: [],
            });
        }
    });
    items.forEach((item: any) => {
        if (item.parent) {
            navItems
                .find((navItem) => navItem.id === item.parent)
                ?.items?.push({
                    ...item,
                    url: resolvePath(item),
                });
        }
    });
    return navItems;
}

export function SidebarsMenuSectionNav({ items, className, style }: SidebarsMenuSectionNavProps) {

    const navItems = VO(items);
    const [activeItem, setActiveItem] = useState<string | null>(null);

    return <SidebarMenu className={className} style={style}>
        {navItems.map((item) => {
            if (item.is_active === false) {
                return null;
            }
            const hasSubItems = item.items && item.items.length > 0;
            if (!hasSubItems) {
                return (
                    <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                            tooltip={item.name}
                            asChild
                            isActive={activeItem === item.id}
                        >
                            <Link to={item.url || ''}>
                                {item.icon && <Icon name={item.icon} />}
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                );
            }

            return (
                <Collapsible
                    key={item.id}
                    asChild
                    defaultOpen={item.items?.map((subitem) => subitem.id === activeItem) ? true : false}
                    className="group/collapsible"
                >
                    <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                                tooltip={item.name}
                                isActive={activeItem === item.id}
                            >
                                {item.icon && <Icon name={item.icon} />}
                                <span>{item.name}</span>
                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.items?.map((subItem) => {
                                    return (
                                        <SidebarMenuSubItem key={subItem.id}>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={activeItem === subItem.id}
                                            >
                                                <Link to={subItem.url || ''}>
                                                    {subItem.icon && <Icon name={subItem.icon} />}
                                                    <span>{subItem.name}</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    );
                                })}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                    </SidebarMenuItem>
                </Collapsible>
            );
        })}
    </SidebarMenu>

}