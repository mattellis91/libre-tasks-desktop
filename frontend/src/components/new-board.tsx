

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { ElementRef, FormEvent, useRef, useState } from "react";


interface NewBoardProps {
    label:string
    workspaceId:string
    onBoardCreate: (title:string, workspaceId:string) => void;
}

export const NewBoard = ({label, workspaceId, onBoardCreate}:NewBoardProps) => {

    const inputRef = useRef<ElementRef<"input">>(null);
    const buttonRef = useRef<ElementRef<"button">>(null);

    const [boardTitle, setBoardTitle] = useState("");

    // const handleDelete = (e:FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     onDeleteList(inputRef.current?.value as string);
    // }

    // const handleCopy = (e:FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     onCopyList(inputRef.current?.value as string);
    // }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        buttonRef.current?.click();
        onBoardCreate(inputRef.current?.value as string, workspaceId)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
            <Button size="sm" variant="ghost" className={cn("w-full font-normal justify-start pl-10 mb-1", false && "")} >
                <Plus className="h-4 w-4 mr-2" />
                {label}    
            </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3 w-56 ml-24 bg-[#121212] border-[#3f3f3f] border" side="bottom" align="start">
                <div className="text-sm font-medium text-center pb-4">
                    New Board
                </div>
                <PopoverClose asChild>
                    <Button ref={buttonRef} className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <form onSubmit={handleSubmit}>
                    <input ref={inputRef} 
                        name="boardName" 
                        id="boardName" 
                        defaultValue={boardTitle} 
                        placeholder="Enter board name..." 
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm border"
                        onChange={(e) => setBoardTitle(e.currentTarget?.value)}
                    />
                    <Button type="submit" variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
                        Add board
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}