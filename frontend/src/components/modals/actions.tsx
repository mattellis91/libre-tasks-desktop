import { Copy, Trash } from "lucide-react"
import { Button } from "../ui/button"

interface ActionsProps {
    data: any
}

export const Actions = ({data}:ActionsProps) => {
    console.log(data)
    return (
        <div className="space-y-2 mt-2">
            <p className="text-xs font-semibold">
                Actions
            </p>
            <Button variant="gray" size="inline">
                <Copy className="h-4 w-4 mr-2" /> Copy
            </Button>
            <Button variant="gray" size="inline">
                <Trash className="h-4 w-4 mr-2" /> Delete
            </Button>
        </div>
    )
}