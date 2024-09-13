import { AlignLeft } from "lucide-react"
import { useState } from "react";
import { FormTextarea } from "../form-text-area";
import { Button } from "../ui/button";

interface DescriptionProps {
    data:any
}

export const Description = ({data}: DescriptionProps) => {

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

  return (
    <div className="flex items-start gap-x-3 w-full text-stone-1000">
        <AlignLeft className="h-5 w-5 mt-0.5"/>
        <div className="w-full">
            <p className="font-semibold mb-2">
                Description
            </p>
            {isEditing ? 
                (
                    <form className="space-y-2 w-full">
                        <FormTextarea
                            id="description"
                            className="w-full mt-2"
                            placeholder="Add a more details description"
                            defaultValue={data.description || undefined}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button>
                                Save
                            </Button>
                            <Button
                                type="button"
                                onClick={disableEditing}
                                size="sm"
                                variant="ghost"
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : 
                (
                    <div role="button" onClick={enableEditing} className="min-h-[78px] bg-[#282828] text-sm font-medium py-3 px-3.5 rounded-md">
                        {data.description || "Add a more details description..."}
                    </div>
                )
            }
        </div>
        {/* {data.description} */}
    </div>
    )  
}