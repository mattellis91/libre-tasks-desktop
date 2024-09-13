import { Plus, X } from "lucide-react"
import { ListWrapper } from "./ListWrapper"
import { useState, useRef, ElementRef, FormEvent } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Button } from "@/components/ui/button";

interface ListFormProps {
    onNewListCreate (title:string): string
} 

export const ListForm = ({onNewListCreate}: ListFormProps) => {

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    
    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Escape") {
            disableEditing();
        }
    };

    const handleBoardSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNewListCreate(inputRef.current?.value as string);
    }

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    if(isEditing) {
        return (
            <ListWrapper>
                <form ref={formRef} onSubmit={handleBoardSubmit} className="w-full p-3 rounded-md bg-[#121212] border-[#3f3f3f] border space-y-4 shadow-md text-stone-100">
                    <input ref={inputRef} id="title" className="text-sm px-2 py-1 w-full h-7 font-medium border-transparent hover:border-input focus:border-input transition"
                    placeholder="Enter list title">
                    </input>
                    <div className="flex items-center gap-x-1">
                        <Button> Add List</Button>
                        <Button onClick={disableEditing} size="sm" variant="ghost">
                            <X className="h-5 w-5"></X>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <button className="w-full rounded-md bg bg-[#282828] hover:bg-[#3f3f3f] transition p-3 flex items-center font-medium text-sm text-stone-100"
            onClick={enableEditing}>
                <Plus className="h-4 w-4 mr-2"></Plus> Add a list
            </button>
        </ListWrapper>
    )
}