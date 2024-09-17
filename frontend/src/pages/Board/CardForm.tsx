import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { ElementRef, FormEvent, useRef } from "react";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
    onNewCardCreate: (title:string, listId:string) => void;
}

export const CardForm = ({listId, enableEditing, disableEditing, isEditing, onNewCardCreate}: CardFormProps) => {

    const handleCardSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNewCardCreate(textRef.current?.value as string, listId);
        disableEditing();
    }

    const textRef = useRef<ElementRef<"textarea">>(null);

    if (isEditing) {
        return (
            <form onSubmit={handleCardSubmit} className="m-1 py-0.5 px-1 space-y-4">
                <div className="space-y-3 w-full">
                    <div className="space-y-1 w-full">
                        <textarea
                            required={true}
                            placeholder="sdfsdf"
                            name="title"
                            id="title"
                            className={cn("resize-none outline-none shadow-sm w-full p-2 rounded-md text-sm bg-[#282828]")}
                            defaultValue={""}
                            ref={textRef}
                        />
                    </div>
                </div>
                <input hidden id="listId" name="listId" value={listId} defaultValue={""}/>
                <div className="flex items-center gap-x-1">
                    <Button type="submit">Add Card</Button>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="h-5 w-5" />
                    </Button>
                </div>
            </form>
        )
    }
    
    return (
        <div className="pt-2 px-2 text-stone-100">
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-sm"
                size="sm"
                variant="ghost"
            >
                <Plus className="h-4 w-4 mr-2"/>
                Add a card
            </Button>
        </div>
    )
}
