import { Button } from "./ui/button";
import { Accordion } from "@radix-ui/react-accordion";
import { NavItem } from "./nav-item";
import { Logo } from "./Logo";
import { Cog } from "lucide-react";
import { useEffect, useState } from "react";
import { AddBoard, GetWorkspaceIdentities } from "../../wailsjs/go/main/App";
import { useLocalStorage } from "usehooks-ts";
import slugify from "slugify";

interface SidebarProps {
    storageKey?: string;
    onBoardChange (boardId:string, workspaceId:string): void
}

export const Sidebar = ({storageKey = "w-sidebar-state", onBoardChange}: SidebarProps) => {

    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});
    const [defaultAccordionValue, setDefaultAccordionValue] = useState<string[]>([]);

    // const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc:string[], key:string) => {
    //     if(expanded[key]) {
    //         acc.push(key);
    //     }
    //     return acc;
    // }, []);

    const [workspaces, setWorkspaces] = useState([])

    const onExpand = (id:string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id]
        }))
    };

    const onBoardCreate = (title:string, workspaceId:string) => {
        const slug = slugify(title);
        AddBoard(title, slug, workspaceId).then((res) => {
            setWorkspaces(res as unknown as any)
        });
    }

    useEffect(() => {
        GetWorkspaceIdentities().then((res) => {
            setWorkspaces(res as unknown as any)
            setDefaultAccordionValue(res.length === 1 ? [res[0]._id] : []);
        });
    }, [])

    return (
        <div className="bg-[#282828] py-3 px-4 h-full border-r border-[#3f3f3f]">
            <div className="mb-10 mt-2">
                <Logo />
            </div>
            <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
                {workspaces.map((workspace:any) => (
                        <NavItem key={workspace._id} isActive={true} isExpanded={true} workspace={{
                            _id: workspace._id,
                            slug:workspace.slug,
                            imageUrl:"https://avatar.iran.liara.run/public",
                            boards: workspace.boards,
                            name: workspace.title
                        }} onExpand={onExpand} onBoardCreate={onBoardCreate} onBoardChange={onBoardChange} />
                    ))
                }
            </Accordion>
            {/* <div className="font-medium mb-1 mt-10">
                <span className="pl-4">
                    Workspaces
                </span>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <a href="">
                        +
                    </a>
                </Button>
            </div> */}
            <div className="font-medium absolute bottom-6 pl-4">
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                        <Cog className="w-4 h-4"/>
                </Button>
                <span className="pl-4 text-sm">
                        Settings
                </span>                
            </div>
        </div>
    )
}