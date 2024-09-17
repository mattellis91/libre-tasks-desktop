interface ListOptionsProps {
    data:any
    // onAddCard: () => void
    // onDeleteList: (listId: string) => void;
    // onCopyList: (listId: string) => void;
}

import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverClose
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";

export const BoardOptions = ({data }: ListOptionsProps) => {

    const inputRef = useRef<ElementRef<"input">>(null);

    // const handleDelete = (e:FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     onDeleteList(inputRef.current?.value as string);
    // }

    // const handleCopy = (e:FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     onCopyList(inputRef.current?.value as string);
    // }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3 w-56 bg-[#121212] border-[#3f3f3f] border" side="bottom" align="start">
                <div className="text-sm font-medium text-center pb-4">
                    Board Actions
                </div>
                <PopoverClose asChild>
                    <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4"/>
                    </Button>
                </PopoverClose>
                <Button type="button" variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
                    Edit Board...
                </Button>
                <form>
                    <input ref={inputRef} hidden name="id" id="id" value={data._id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <Button type="submit" variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
                        Copy Board...
                    </Button>
                </form>
                <Separator />
                <form>
                    <input ref={inputRef} hidden name="id" id="id" value={data._id} />
                    <input hidden name="boardId" id="boardId" value={data.boardId} />
                    <Button type="submit" variant="ghost" className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm">
                        Delete this board...
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}