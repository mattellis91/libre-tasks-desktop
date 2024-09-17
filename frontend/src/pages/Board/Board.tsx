import { ListContainer } from "./ListContainer";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { SetCurrentBoard, AddList, UpdateLists } from "../../../wailsjs/go/main/App";
import { createId } from "@paralleldrive/cuid2";
import { cloneDeep } from "lodash";

export default function Board() {

    const onNewListCreate = (title:string) => {
        
        const now = Date.now();

        const newList = {
            _id: createId(),
            title: title,
            order: boardLists.length + 1,
            createdAt: now,
            updatedAt: now,
            cards: []
        }

        AddList(newList as unknown as any).then((res) => setBoardLists(res.lists as unknown as any[] ?? []));
    }

    const onCopyList = (listId: string) => {

        const foundIndex = boardLists.findIndex((list) => list._id === listId);

        if(foundIndex > -1) {

            const foundBoard = boardLists[foundIndex];
            let newOrder = foundBoard.order + 1;

            const now = Date.now();

            const newList = {
                _id: createId(),
                title: foundBoard.title,
                order: newOrder,
                createdAt: now,
                updatedAt: now,
                cards: cloneDeep(foundBoard.cards).map((card:any) => {
                    return {
                        ...card,
                        _id: createId(),
                    };
                })
            }

            for(let i = foundIndex + 1; i < boardLists.length; i++) {
                newOrder++;
                boardLists[i].order = newOrder;
            }

            boardLists.splice(foundIndex, 0, newList);

            const items = cloneDeep(boardLists);

            setBoardLists(items);
            UpdateLists(items);
        }

    }

    const onDeleteList = (listId: string) => {

        const foundIndex = boardLists.findIndex((list) => list._id === listId);
        if(foundIndex > -1) {

            const items = [...boardLists];

            items.splice(foundIndex, 1);
            setBoardLists(items);
            UpdateLists(items);
        }
    }

    const [boardLists, setBoardLists] = useState<any[]>([]);

    useEffect(() => {
        SetCurrentBoard("test-board").then((res) => setBoardLists(res.lists as unknown as any[] ?? []));
    }, [])

    return (
        <main className="h-screen">
            <div className="flex h-full">
                <div className="w-72 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                <div className="w-full py-4 px-5 overflow-x-auto bg-[#121212] scrollbar-track-red-700">
                    <div className="flex">
                    </div>
                    <ListContainer 
                        onNewListCreate={onNewListCreate} 
                        onDeleteList={onDeleteList} 
                        data={boardLists}
                        onCopyList={onCopyList}
                    ></ListContainer>
                </div>
            </div>
        </main>
    )
}
