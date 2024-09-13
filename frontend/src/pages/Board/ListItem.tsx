import { useState } from "react"
import { ListHeader } from "./ListHeader"
import { CardForm } from "./CardForm"
import { cn } from "@/lib/utils"
import { CardItem } from "./CardItem"

import {
    Draggable, Droppable   
} from "@hello-pangea/dnd"

interface ListItemProps {
    data: any
    index: number
}
export const ListItem = ({data, index}: ListItemProps) => {
    
    const [isEditing, setIsEditing] = useState(false);

    const disableEditing = () => {
        setIsEditing(false);
    }

    const enableEditing = () => {
        setIsEditing(true);
        // setTimeout(() => {
        //     textAreaRef.current?.focus();
        //     textAreaRef.current?.select();
        // });
    }

    const onCardAdd = () => {
        console.log("card add")
    }

    return (
        <Draggable draggableId={data.id} index={index}>
            {(provided) => (
                <li 
                {...provided.draggableProps}
                ref={provided.innerRef}
                className="shrink-0 h-full w-[272px] select-none">
                <div 
                    {...provided.dragHandleProps}
                    className="w-full rounded-md bg-[#121212] border-[#3f3f3f] border shadow-md pb-2 text-stone-100">
                    {/* {data.id}{index} */}
                    <ListHeader data={data} onAddCard={() => {onCardAdd}} />
                    <Droppable droppableId={data.id} type="card">
                        {(provided) => (
                            <ol 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={cn("mx-1 px-1 py-0.5 flex flex-col gap-y-2", data.cards?.length > 0 ? "mt-2" : "mt-1")}>
                            {data.cards?.map((card:any, index:number) => {
                                return (
                                    <CardItem 
                                        index={index}
                                        key={card.id}
                                        data={card}
                                    />
                                )
                            })}
                            {provided.placeholder}
                            </ol>
                        )}
                    </Droppable>
                    <CardForm isEditing={isEditing} enableEditing={enableEditing} disableEditing={disableEditing} listId={data.id}/>
                </div>
            </li>
            )}
        </Draggable>
    )
}