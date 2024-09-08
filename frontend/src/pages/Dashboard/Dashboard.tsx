import { FormEvent, useEffect, useState } from "react";
import { Addboard, GetBoards, RemoveBoard } from "../../../wailsjs/go/main/App"
import { Sidebar } from "../../components/sidebar";
import { Board } from "@/types/nav";
import { Button } from "@/components/ui/button";


export default function Dashboard() {

    const [boards, setBoards] = useState<Board[]>([]);
    const [boardTitle, setBoardTitle] = useState<string>("");

    useEffect(() => {
        async function getBoards() {
            const boards = await GetBoards();
            setBoards(boards as Board[] ?? []);
        }
        getBoards();
    }, []);

    const handleBoardSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        Addboard({title:boardTitle}).then((res) => {
            setBoards(res);
            setBoardTitle("");
        });        
    } 

    const handleRemove = (title:string) => {
        RemoveBoard(title).then((res) => {
            setBoards(res);
        });
    }
    
    return (
        <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="space-y-2">
                        <form onSubmit={handleBoardSubmit}>
                            <div className="flex flex-col space-y-2">
                                <input type="text" id="title" name="title" required placeholder="Enter a board title" className="border-black border p-1" onChange={(e) => setBoardTitle(e.target.value)} value={boardTitle}/>
                                <Button type="submit">Create Board</Button>
                            </div>
                        </form>
                        <div className="space-y-2">
                            {boards.map((board, i) => (
                                <div key={i}>
                                    Board: {board.title}
                                    <Button size="sm" variant="default" className="ml-2" onClick={() => handleRemove(board.title)}>Remove</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}