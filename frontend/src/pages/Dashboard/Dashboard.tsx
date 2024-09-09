// import { FormEvent, useEffect, useState } from "react";
// import { Addboard, GetBoards, RemoveBoard } from "../../../wailsjs/go/main/App"
import { Separator } from "@/components/ui/separator";
import { Sidebar } from "../../components/sidebar";
// import { Board } from "@/types/nav";
import { Info } from "./Info";
import { BoardList } from "./components/board-list";
import { Toaster } from "sonner";


export default function Dashboard() {

    // const [boards, setBoards] = useState<Board[]>([]);

    // useEffect(() => {
    //     async function getBoards() {
    //         const boards = await GetBoards();
    //         setBoards(boards as Board[] ?? []);
    //     }
    //     getBoards();
    // }, []);

    
    
    return (
        <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
            <Toaster />
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                <div className="w-full mb-20">
                    <Info/>
                    <Separator className="my-4"/>
                    <div className="px-2 md:px-4">
                        <BoardList />
                    </div>
                </div>
            </div>
        </main>
    )
}