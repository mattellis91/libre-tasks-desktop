import { useEffect, useState } from "react"
import { ListForm } from "./ListForm"
import { ListItem } from "./ListItem"

import {
    DragDropContext, Droppable
} from "@hello-pangea/dnd";
import { MoreHorizontal } from "lucide-react";

interface ListContainerProps {
    data: any[]
    onNewListCreate (title:string): void
}

export const ListContainer = ({data, onNewListCreate} : ListContainerProps) => {

    const [orderedData, setOrderedData] = useState(data)

    useEffect(() => {
        setOrderedData(data)
    }, [data]);

    function reorder<T>(list: T[], startIndex:number, endIndex:number) {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    }

    const onDragEnd = (result:any) => {

        console.log("END DRAG!!!");

        const {destination, source, type} = result;

        if(!destination) {
            return;
        }

        //dropped in the same position
        if(destination.droppableId === source.droppableId && destination.index == source.index) {
            return;
        }

        //moving a list
        if(type === "list") {
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({...item, order: index}));
            setOrderedData(items);

            //TODO: update board json file
        }

        //moving a card
        if(type === "card") {

            console.log("CARD DROPPED");

            const newOrderedData = [...orderedData];
            
            //source and dest list
            const sourceList = newOrderedData.find(list => list._id === source.droppableId);
            const destList = newOrderedData.find(list => list._id === destination.droppableId);

            if(!sourceList || !destList) {

                console.log("NOT FOUND")

                return;
            }

            //check if cards exists on the source list
            if(!sourceList.cards) {
                sourceList.cards = [];
            }

            //cards exists on the destination list
            if(!destList.cards) {
                destList.cards = [];
            }

            //move card within the same list
            if(source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                );

                reorderedCards.forEach((card:any, index:number) => {
                    card.order = index;
                });

                sourceList.cards = reorderedCards;
                setOrderedData(newOrderedData);

                //TODO: update board json
            } else {
                //move to card from one list to another
                const [movedCard] = sourceList.cards.splice(source.index, 1);
                movedCard.listId = destination.droppableId;
                destList.cards.splice(destination.index, 0, movedCard);

                sourceList.cards.forEach((card:any, index:number) => {
                    card.order = index;
                });

                destination.cards.forEach((card:any, index:number) => {
                    card.order = index;
                });

                setOrderedData(newOrderedData);

                //TODO: update board json
            }
        }
    }; 

    return (
        <div>
            <div className="mb-4 w-fit text-sm bg-[#282828] border border-[#282828] px-2 rounded-sm">
                <span className="mr-4 inline-block">Test Board</span>
                <button><MoreHorizontal  className="inline-block"/></button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="lists" type="list" direction="horizontal">
                    {(provided) => (
                        <ol 
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex gap-x-3 h-full">
                        {orderedData.map((list, index) => {
                            return (
                                <ListItem 
                                    key={list._id}
                                    index={index}
                                    data={list} />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm onNewListCreate={onNewListCreate}/>
                        </ol>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}