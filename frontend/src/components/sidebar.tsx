import { Button } from "./ui/button";
import { Accordion } from "@radix-ui/react-accordion";
import { NavItem } from "./nav-item";
import { Logo } from "./Logo";
import { Cog } from "lucide-react";

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
        <div className="bg-[#282828] py-5 px-4 h-full border-r border-[#3f3f3f]">
            <div className="mb-10 mt-2">
                <Logo />
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
            <div className="font-medium mb-1 mt-10">
                <span className="pl-4">
                    Workspaces
                </span>
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                    <a href="">
                        +
                    </a>
                </Button>
            </div>
            <div className="font-medium mb-1 pl-4 mb-auto">
                <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                        <Cog className="w-5 h-5"/>
                </Button>
                <span className="pl-4">
                        Settings
                </span>                
            </div>
        </div>
    )
}