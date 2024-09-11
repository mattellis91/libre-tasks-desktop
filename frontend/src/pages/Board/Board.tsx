import { createId } from "@paralleldrive/cuid2";
import { BoardNavBar } from "./BoardNavBar";
import { ListContainer } from "./ListContainer";

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
        <main className="pt-20 md:pt-24">
            <BoardNavBar id={"test"}/>
            <div className="relative pt-6 h-full px-6">
                <div className="h-full overflow-x-auto">
                    <ListContainer onNewListCreate={onNewListCreate} data={data}></ListContainer>
                </div>
            </div>
        </main>
    )
}
