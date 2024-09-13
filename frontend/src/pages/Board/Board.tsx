import { ListContainer } from "./ListContainer";
import { Sidebar } from "@/components/sidebar";
import { useEffect, useState } from "react";
import { SetCurrentBoard, AddList } from "../../../wailsjs/go/main/App";
import { createId } from "@paralleldrive/cuid2";

export default function Board() {

    console.log("BOarddd");

    const onNewListCreate = (title:string) => {
        console.log("New List Created form board");
        console.log(title);
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
                    <ListContainer onNewListCreate={onNewListCreate} data={boardLists}></ListContainer>
                </div>
            </div>
        </main>
    )
}
