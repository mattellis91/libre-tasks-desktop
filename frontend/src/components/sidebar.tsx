import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Accordion } from "@radix-ui/react-accordion";
import { NavItem } from "./nav-item";

// interface SidebarProps {
//     storageKey?: string;
// }

export const Sidebar = () => {

    // const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

    // const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc:string[], key:string) => {
    //     if(expanded[key]) {
    //         acc.push(key);
    //     }
    //     return acc;
    // }, []);

    const onExpand = () => {
    //     setExpanded((curr) => ({
    //         ...curr,
    //         [id]: !expanded[id]
    //     }))
    };

    return (
        <>
            <div className="font-medium text-xs flex items-center mb-1">
                <span className="pl-4">
                    Workspaces
                </span>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <a href="">
                        <Plus className="h-4 w-4"/>
                    </a>
                </Button>
            </div>
            <Accordion type="multiple" defaultValue={[]} className="space-y-2">
                <NavItem key="test1" isActive={true} isExpanded={false} organization={{
                    id:"test1",
                    slug:"test-1",
                    imageUrl:"https://avatar.iran.liara.run/public",
                    name: "Test 1"
                }} onExpand={onExpand}/>
                <NavItem key="test2" isActive={false} isExpanded={false} organization={{
                    id:"test2",
                    slug:"test-2",
                    imageUrl:"https://avatar.iran.liara.run/public",
                    name: "Test 2"
                }} onExpand={onExpand}/>
            </Accordion>
        </>
    )
}