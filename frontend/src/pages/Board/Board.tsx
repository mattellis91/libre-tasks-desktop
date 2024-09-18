import { ListContainer } from "./ListContainer";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { AddList, UpdateLists, GetCurrentBoard, ChangeCurrentBoard } from "../../../wailsjs/go/main/App";
import { createId } from "@paralleldrive/cuid2";
import { cloneDeep } from "lodash";
import { BoardOptions } from "./board-options";
import { AppWindow, Minimize, Minimize2, Square, WindIcon, X } from "lucide-react";

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
    const [boardDetails, setBoardDetails] = useState<any>({});

    useEffect(() => {
        GetCurrentBoard().then((res) => {
                setBoardLists(res.lists as unknown as any[] ?? [])
                setBoardDetails({
                    _id: res._id,
                    slug: res.slug,
                    title: res.title,
                });
            }
        );
    }, [])

    const onBoardChange = (boardId:string, workspaceId:string) => {
        ChangeCurrentBoard(boardId, workspaceId).then((res) => {
            setBoardLists(res.lists as unknown as any[] ?? [])
                setBoardDetails({
                    _id: res._id,
                    slug: res.slug,
                    title: res.title,
            });
        });
    }

    return (
        <main className="h-screen">
            <div className="flex h-full">
                <div className="w-72 shrink-0 hidden md:block">
                    <Sidebar onBoardChange={onBoardChange}/>
                </div>
                <div className="w-full py-4 px-5 overflow-x-auto bg-[#121212] scrollbar-track-red-700">
                    <div className="flex justify-between">
                        <div className="mb-4 w-fit text-sm bg-[#282828] border border-[#282828] px-2 rounded-sm">
                            <div>
                                <span className="mr-4 inline-block">{boardDetails.title}</span>
                                <BoardOptions data={boardDetails}/>
                            </div>
                        </div>
                        <div className="flex">
                            <Minimize2 className="mr-8 hover:cursor-pointer" />
                            <AppWindow className="mr-8 hover:cursor-pointer" />
                            <X className="hover:cursor-pointer"/>
                        </div>
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
