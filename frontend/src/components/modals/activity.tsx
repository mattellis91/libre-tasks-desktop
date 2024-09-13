import { ActivityIcon } from "lucide-react";
import { ActivityItem } from "./activity-item";

interface ActivityProps {
    items: any[]
}

export const Activity = ({items}:ActivityProps) => {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <ActivityIcon className="h-5 w-5 mt-0.5 text-sone-100"/>
            <div className="w-full">
                <p className="font-semibold text-stone-100 mb-2">
                    Activity
                </p>
                <ol className="mt-2 space-y-4">
                    {items.map((item) => (
                        <ActivityItem key={item.id} data={item}/>
                    ))}
                </ol>
            </div>
        </div>
    );
}