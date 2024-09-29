import { useEffect, useState } from "react"
import { ListForm } from "./ListForm"
import { ListItem } from "./ListItem"

import {
    DragDropContext, Droppable
} from "@hello-pangea/dnd";
import { createId } from "@paralleldrive/cuid2";
import { UpdateLists } from "../../../wailsjs/go/main/App";

interface ListContainerProps {
    data: any[]
    onNewListCreate (title:string): void
    onDeleteList(listId:string): void
    onCopyList(listId:string): void
}

export const ListContainer = ({data, onNewListCreate, onDeleteList, onCopyList} : ListContainerProps) => {

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
            UpdateLists(items);
        }

        //moving a card
        if(type === "card") {

            const newOrderedData = [...orderedData];
            
            //source and dest list
            const sourceList = newOrderedData.find(list => list._id === source.droppableId);
            const destList = newOrderedData.find(list => list._id === destination.droppableId);

            if(!sourceList || !destList) {

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
                UpdateLists(newOrderedData);

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
                UpdateLists(newOrderedData);
            }
        }
    }; 

    const onNewCardCreate =  (title:string, listId:string) => {

        const newOrderedData = [...orderedData]
        
        const foundList = newOrderedData.find((list) => list._id === listId);

        if(foundList) {
       
            const now = Date.now();
            const newCard = {
                _id: createId(),
                title: title,
                order: foundList.cards.length + 1,
                createdAt: now,
                updatedAt: now,
                description: ""
            }
            foundList.cards.push(newCard);

            setOrderedData(newOrderedData);
            UpdateLists(newOrderedData)

        }
    }

    const onRenameList = (listId: string, title: string) => {
        const newOrderedData = [...orderedData]
        const foundList = newOrderedData.find((list) => list._id === listId);

        if(foundList) {
            foundList.title = title;
        }

        setOrderedData(newOrderedData);
        UpdateLists(newOrderedData);
    };

    return (
        <div>
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
                                    onDeleteList={onDeleteList}
                                    onCopyList={onCopyList}
                                    onNewCardCreate={onNewCardCreate}
                                    key={list._id}
                                    index={index}
                                    onRenameList={onRenameList}
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