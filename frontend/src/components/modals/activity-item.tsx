import { format } from "date-fns"

interface ActivityItemProps {
    data: any
}

export const ActivityItem = ({data} : ActivityItemProps) => {
    return (
        // <li className="flex items-center gap-x-2">
        // </li>
        <div className="flex flex-col space-y-0.5">
            <p className="text-sm text-stone-100">
                {/* <span className="font-semibold lowercase text-neutral-700">
                    
                </span> */}
                {data.title}
            </p>
            <p className="text-xs text-stone-300">
                {format(new Date(), "MMM d, yyyy 'at' h:mm a")}
            </p>
        </div>
    )
}