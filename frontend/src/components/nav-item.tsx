"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import {
    Layout,
    Settings,
    Plus
} from "lucide-react";
// import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NewBoard } from "./new-board";
// import { Badge } from "./ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";

export type Workspace = {
    _id: string;
    slug: string;
    imageUrl: string;
    name: string
    boards: any[]
}

interface NavItemProps {
    isExpanded: boolean;
    isActive: boolean;
    workspace: Workspace;
    onExpand: (id:string) => void;
    onBoardCreate: (title:string, workspaceId:string) => void;
    onBoardChange: (boardId:string, workspaceId:string) => void;
}

export const NavItem = ({
    isExpanded,
    isActive,
    workspace,
    onExpand,
    onBoardCreate,
    onBoardChange,
}: NavItemProps) => {

    const routes = [];

    for(const board of workspace.boards) {
        routes.push({
            label: board.title,
            icon: <Layout className="h-4 w-4 mr-2" />,
            href:"",
            id: board._id
        });
    }

    routes.push(
        {
            label: "Add Board",
            icon: <Plus className="h-4 w-4 mr-2" />,
            href: `/organization/${workspace._id}/billing`
        },
    )

    routes.push(
        {
            label: "Settings",
            icon: <Settings className="h-4 w-4 mr-2" />,
            href: `/organization/${workspace._id}/settings`
        },
    )

    const onClick = (boardId:string, workspaceId:string) => {
        onBoardChange(boardId, workspaceId);
    }

    return (
        <AccordionItem value={workspace._id} className="border-none">
            <AccordionTrigger onClick={() => onExpand(workspace._id) } className={cn("flex items-center gap-x-2 p-1.5 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
            isActive && !isExpanded && ""
            )}>
                <div className="flex items-center gap-x-2 pl-4">
                    <span className="font-medium text-sm">{workspace.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
                {
                    routes.map((route) => (
                        route.label !== "Add Board" ? <Button key={`${workspace._id}-${route.href}`} size="sm" onClick={() => onClick(route.id, workspace._id)} className={cn("w-full font-normal justify-start pl-10 mb-1", false && "")} variant="ghost">
                            {route.icon}
                            {route.label}
                        </Button> : <NewBoard key={`${workspace._id}-${route.href}`} label={route.label} onBoardCreate={onBoardCreate} workspaceId={workspace._id}/>
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