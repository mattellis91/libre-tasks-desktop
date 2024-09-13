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
            <div className="w-full">
                <Button variant="gray" size="inline" className="bg-[#282828] hover:bg-[#3f3f3f] transition">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                </Button>
            </div>
            <div className="w-full">
                <Button variant="gray" size="inline" className="bg-[#282828] hover:bg-[#3f3f3f] transition">
                    <Trash className="h-4 w-4 mr-2" /> Delete
                </Button>
            </div>
        </div>
    )
}