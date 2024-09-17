interface CardItemProps {
    index:number
    data:any
}

// import { Badge } from "@/components/ui/badge"
import { useCardModal } from "@/hooks/use-card-modal"
import { Draggable } from "@hello-pangea/dnd"

export const CardItem = ({data,index}:CardItemProps) => {

    const cardModal = useCardModal();

    return (
        <Draggable draggableId={data._id} index={index}>
            {(provided) => (
                <div 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={() => cardModal.onOpen(data._id)}
                    role="button" className="truncate border-2 border-transparent hover:border-[#575757] py-2 px-3 text-sm bg-[#282828] rounded-md shadow-sm">
                    {data.title}
                    {/* <div className="flex flex-row">
                        <Badge className="mt-2 bg-red-900 " variant="label">Test</Badge>
                        <Badge className="mt-2 bg-green-900 " variant="label">Test 2</Badge>
                    </div> */}
                </div>
            )}
        </Draggable>
    )
}