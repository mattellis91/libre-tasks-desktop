import { ListForm } from "./ListForm"

interface ListContainerProps {
    boardId: string
    onNewListCreate (title:string): string
}

export const ListContainer = ({boardId, onNewListCreate} : ListContainerProps) => {
    return (
        <ol>
            <ListForm onNewListCreate={onNewListCreate}/>
            <div className="flex-shrink-0 w-1">{boardId}</div>
        </ol>
    )
}