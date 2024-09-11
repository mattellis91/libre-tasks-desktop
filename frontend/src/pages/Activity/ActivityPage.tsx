import { Separator } from "@/components/ui/separator"
import { Info } from "../Dashboard/Info"
import { ActivityList } from "./ActivityList"
import { Sidebar } from "@/components/sidebar"

export const ActivityPage = () => {
    return (
        <main className="pt-20 md:pt-24">
        <div className="relative pt-6 h-full px-6">
            <div className="h-full overflow-x-auto">
            <Info/>
                    <Separator className="my-4"/>
                    <div className="px-2 md:px-4">
                        <ActivityList />
                    </div>
            </div>
        </div>
        </main>
    )
}