import { Hint } from "@/components/hint";
import { HelpCircle, User2 } from "lucide-react";
import { FormPopover } from "./form-popover";
import { useEffect, useState } from "react";
import { Board } from "@/types/nav";
import { GetBoardIdentities } from "../../../../wailsjs/go/main/App";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";


export const BoardList = () => {

    const [boards, setBoards] = useState<Board[]>([]);

    useEffect(() => {
        async function getBoards() {
            const boards = await GetBoardIdentities();
            console.log("BOARDS");
            console.log(boards);
            setBoards(boards as Board[] ?? []);
        }
        getBoards();
    }, []);


    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg">
                <User2 className="h-6 w-6 mr-2"/>
                Your Boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {boards.map((board) => (
                    <Link to="/board" key={board._id} className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden">
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition p-2">
                            <p className="relative font-semibold text-white">{board.title}</p>
                        </div>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div role="button" className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition">
                        <p className="text-sm">Create new board</p>
                        <span className="text-xl">5 remaining</span>
                        <Hint sideOffset={40} description={`Free workspaces can have up to 5 open boards`}>
                            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grod grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
            <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
        </div>
    )
}