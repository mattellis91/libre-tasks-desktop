import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover"
import { PopoverClose } from "@radix-ui/react-popover";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";


import { Addboard, } from "../../../../wailsjs/go/main/App"
import { toast } from "sonner";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
}

export const FormPopover = ({
    children, 
    side = "bottom",
    align,
    sideOffset = 0
}:FormPopoverProps) => {

    
    const [boardTitle, setBoardTitle] = useState<string>("");

    const handleBoardSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Addboard({title:boardTitle}).then(() => {
            setBoardTitle("");
            toast.success("Board created");
        });        
    } 

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent 
                align={align}
                className="w-80 pt-3"
                side={side}
                sideOffset={sideOffset}
            >
                <div className="text-sm font-medium text-center pb-4">
                    Create Board
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2" variant="ghost">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form onSubmit={handleBoardSubmit}>
                    <div className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <input type="text" id="title" name="title" required placeholder="Enter a board title" className="border-black border p-1" onChange={(e) => setBoardTitle(e.target.value)} value={boardTitle}/>
                            <Button type="submit">Create Board</Button>
                        </div>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}