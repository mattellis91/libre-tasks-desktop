import { FormTextarea } from "@/components/form-text-area";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface CardFormProps {
    listId: string;
    enableEditing: () => void;
    disableEditing: () => void;
    isEditing: boolean;
}

export const CardForm = ({listId, enableEditing, disableEditing, isEditing}: CardFormProps) => {

    if (isEditing) {
        return (
            <form className="m-1 py-0.5 px-1 space-y-4">
                <FormTextarea 
                    className="bg-[#282828] text-stone-100"
                    id="title"
                    onKeyDown={() => {console.log()}}
                    placeholder="enter title for this card"
                />
                <input hidden id="listId" name="listId" value={listId} defaultValue=""/>
                <div className="flex items-center gap-x-1">
                    <Button type="button">Add Card</Button>
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
