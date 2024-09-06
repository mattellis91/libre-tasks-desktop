
import { boards } from "@/data/board";
import { Board } from "./board";
import { Form } from "./form";

const OrganizationIdPage = async () => {

    const bs = boards;

    return (
        <div className="fex flex-col space-y-4">
            <Form />
            <div className="space-y-2">
                {bs.map((board) => (
                    <Board key={board.id} id={board.id} title={board.title} />   
                ))}
            </div>
        </div>
    )
}

export default OrganizationIdPage;