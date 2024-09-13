import { createId } from "@paralleldrive/cuid2";
import { ListContainer } from "./ListContainer";
import { Sidebar } from "@/components/sidebar";

export default function Board() {

    console.log("BOarddd");

    const onNewListCreate = (title:string) => {
        console.log("New List Created form board");
        console.log(title);
        return title;
    }

    const data = [
        {
            id: createId(),
            title: "list 1",
            order: 1,
            cards: [{
                id: createId(),
                title: "card 1",
                order: 1,
                description: "sdfsdf"       
            },{
                id: createId(),
                title: "card 2",
                order: 2,
                description: "aaaa"       
            }]
        },
        {
            id: createId(),
            title: "list 2",
            order: 2,
            cards: [{
                id: createId(),
                title: "card 1",
                order: 1,
                description: "sdfsdf"       
            },{
                id: createId(),
                title: "card 2",
                order: 2,
                description: "aaaa"       
            }]
        },
        {
            id: createId(),
            title: "list 3",
            order: 2,
            cards: [{
                id: createId(),
                title: "card 1",
                order: 1,
                description: "sdfsdf"       
            },{
                id: createId(),
                title: "card 2",
                order: 2,
                description: "aaaa"       
            }]
        },
        {
            id: createId(),
            title: "list 4",
            order: 2,
            cards: [{
                id: createId(),
                title: "card 1",
                order: 1,
                description: "sdfsdf"       
            },{
                id: createId(),
                title: "card 2",
                order: 2,
                description: "aaaa"       
            }]
        }
    ]

    return (
        // <main className="pt-20 md:pt-24 h-screen">
        //     <BoardNavBar id={"test"}/>
        //     <div className="relative pt-6 h-full px-6">
        //         <div className="h-full overflow-x-auto">
                    
        //         </div>
        //     </div>
        // </main>

        <main className="h-screen">
            <div className="flex h-full">
                <div className="w-72 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                <div className="w-full py-4 px-5 overflow-x-auto bg-[#121212] scrollbar-track-red-700">
                    <ListContainer onNewListCreate={onNewListCreate} data={data}></ListContainer>
                </div>
            </div>
        </main>
    )
}
