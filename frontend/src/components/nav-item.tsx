"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import {
    ListTodo,
    StickyNote,
    Layout,
    Settings
} from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
    id: string;
    slug: string;
    imageUrl: string;
    name: string
}

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    organization: Organization;
    onExpand: (id:string) => void;
}

export const NavItem = ({
    isExpanded,
    isActive,
    organization,
    onExpand
}: NavItemProps) => {

    // const router = useRouter();
    // const pathname = usePathname(); 

    const routes = [
        {
            label: "Boards",
            icon: <Layout className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}`,
            count: 1
        },
        {
            label: "Todos",
            icon: <ListTodo className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/activity`
        },
        {
            label: "Notes",
            icon: <StickyNote className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/billing`
        },
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${organization.id}/settings`
        },
    ]

    const onClick = (href: string) => {
        // router.push(href);
        console.log(href);
    }

    return (
        <AccordionItem value={organization.id} className="border-none">
            <AccordionTrigger onClick={() => onExpand(organization.id) } className={cn("flex items-center gap-x-2 p-1.5 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
            isActive && !isExpanded && "bg-sky-500/10 text-sky-700"
            )}>
                <div className="flex items-center gap-x-2 pl-4">
                    <span className="font-medium text-sm">{organization.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
                {
                    routes.map((route) => (
                        <Button key={"1"} size="sm" onClick={() => onClick(route.href)} className={cn("w-full font-normal justify-start pl-10 mb-1", false && "bg-sky-500/10 text-sky-700")} variant="ghost">
                            {route.icon}
                            {route.label}
                            {route.count && <span className="ml-2">( {route.count} )</span>}
                        </Button>
                    ))
                }
            </AccordionContent>
        </AccordionItem>
    );
}

// NavItem.Skeleton = function SkeletonNavItem() {
//     return (
//         <div className="flex items-center gap-x-2">
//             <div className="w-10 h-10 relative shrink-0">
//                 <Skeleton className="h-full w-full absolute"></Skeleton>
//             </div>
//             <Skeleton className="h-10 w-full"></Skeleton>
//         </div>
//     );
// };