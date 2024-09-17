import { Button } from "./ui/button";
import { Accordion } from "@radix-ui/react-accordion";
import { NavItem } from "./nav-item";
import { Logo } from "./Logo";
import { Cog } from "lucide-react";
import { useEffect } from "react";
import { GetWorkspaceIdentities } from "../../wailsjs/go/main/App";

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

    useEffect(() => {
        console.log("Side bar")
        GetWorkspaceIdentities().then((res) => {
            console.log("Identities")
            console.log(res);
        })
    }, [])

    return (
        <div className="bg-[#282828] py-3 px-4 h-full border-r border-[#3f3f3f]">
            <div className="mb-10 mt-2">
                <Logo />
            </div>
            <Accordion type="multiple" defaultValue={[]} className="space-y-2">
                <NavItem key="test1" isActive={true} isExpanded={true} organization={{
                    id:"test1",
                    slug:"test-1",
                    imageUrl:"https://avatar.iran.liara.run/public",
                    name: "Default Workspace"
                }} onExpand={onExpand}/>
                {/* <NavItem key="test2" isActive={false} isExpanded={false} organization={{
                    id:"test2",
                    slug:"test-2",
                    imageUrl:"https://avatar.iran.liara.run/public",
                    name: "Test 2"
                }} onExpand={onExpand}/> */}
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