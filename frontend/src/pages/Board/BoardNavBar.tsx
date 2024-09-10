import { Button } from "@/components/ui/button";
import { ElementRef, FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { BoardOptions } from "./BoardOptions";

interface BoardNavBarProps {
    id:string;
}

export const BoardNavBar = ({
    id
}: BoardNavBarProps) => {

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const [isEditing, setIsEditing] = useState(false);

    const [title, setTitle] = useState<string>(`Test board ${id}`);

    // const disableEditing = () => {
    //     setIsEditing(false);
    // }

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })
    }

    const onBlur = (e:FormEvent) => {
        e.preventDefault();
        formRef.current?.requestSubmit();
    }

    const onSubmit = () => {
        setIsEditing(false);
        toast.success("Successfully changed board title");
    }

    return (
        <div className="w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white">
            {
                isEditing ? 
                <form onSubmit={onSubmit} ref={formRef} className="flex items-center gap-x-2">
                    <input ref={inputRef}
                        id="title" 
                        onBlur={onBlur}
                        defaultValue={title}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        className="font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
                    />
                </form> : <Button variant="transparent" className="font-bold h-auto w-auto p-1 px-2" onClick={enableEditing}>{title}</Button> 
            }
            <div className="ml-auto">
                <BoardOptions id="test" />
            </div>
        </div>
    )
}