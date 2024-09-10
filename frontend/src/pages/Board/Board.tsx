import { BoardNavBar } from "./BoardNavBar";
import { ListContainer } from "./ListContainer";

export default function Board() {

    // const lists = [
    //     {
    //         title: "list 1",
    //         order: 1,
    //         cards: [{
    //             title: "card 1",
    //             order: 1,
    //             description: "sdfsdf"       
    //         },{
    //             title: "card 2",
    //             order: 2,
    //             description: "aaaa"       
    //         }]
    //     }
    // ]

    console.log("BOarddd");

    const onNewListCreate = (title:string) => {
        console.log("New List Created form board");
        console.log(title);
        return title;
    }

    return (
        <main className="pt-20 md:pt-24">
            <BoardNavBar id={"test"}/>
            <div className="relative pt-6 h-full px-6">
                <div className="h-full overflow-x-auto">
                    <ListContainer boardId="test" onNewListCreate={onNewListCreate}></ListContainer>
                </div>
            </div>
        </main>
    )
}
