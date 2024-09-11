import { ActivityItem } from "@/components/modals/activity-item"
import { createId } from "@paralleldrive/cuid2"

export const ActivityList = () => {

    const testLogs = [
        {
            id: createId(),
            title: "test log"
        },
        {
            id: createId(),
            title: "test log 2"
        },
        {
            id: createId(),
            title: "test log 3"
        }
    ]

    return (
        <ol className="space-y-4 mt-4">
            <p className="hidden last:block text-xs text-center text-muted-foreground">
                No activities found
            </p>
            {
                testLogs.map((item) => (
                    <ActivityItem data={item} key={item.id}/>
                ))
            }
        </ol>
    )

}