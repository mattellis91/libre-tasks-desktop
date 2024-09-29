interface ListHeaderProps {
    data: any
    onAddCard: () => void;
    onDeleteList: (listId: string) => void;
    onCopyList: (listId: string) => void;
    onRenameList: (listId: string, title: string) => void;
}

import { useState, useRef, ElementRef, FormEvent } from "react"
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./ListOptions";

export const ListHeader = ({data, onAddCard, onDeleteList, onCopyList, onRenameList}: ListHeaderProps) => {

    const [title, setTitle] = useState(data.title);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
        setTitle("")
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if(e.key === "Escape") {
            formRef.current?.requestSubmit();
        }
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("LIST HEADER SUBMIT");
        onRenameList(data._id, inputRef.current?.value ?? data.title) 
    }

    useEventListener("keydown", onKeyDown);

    return (
        <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
            {isEditing ? (
                <form ref={formRef} onSubmit={handleSubmit} className="flex-1 px-[2px]">
                    <input hidden id="id" name="id" value={data._id}></input>
                    <input hidden id="boardId" name="boardId" value={data._id}></input>
                    <input 
                        ref={inputRef} 
                        className="w-full text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate"
                        onBlur={() => {disableEditing()}}
                        id="title"
                        placeholder="Enter list title"
                        defaultValue={title}
                    />
                    <button type="submit" hidden></button>
                </form>
                ) : <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent" onClick={enableEditing}>{data.title}</div> 
            }
            <ListOptions onAddCard={onAddCard} onDeleteList={onDeleteList} onCopyList={onCopyList} data={data} />
        </div>
    )
}