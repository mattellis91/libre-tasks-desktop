import { Skeleton } from "@/components/ui/skeleton"

export const Info = () => {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <img src="https://avatar.iran.liara.run/public" alt="image" className="rounded-md object-cover"/>
            </div>
            <div className="space-y-1">
                <p className="font-semibold text-xl">Test</p>
                <div></div>
            </div>
        </div>
    )
}

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="w-[60px] h-[60px] relative">
                <Skeleton className="w-full h-full absolute" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-[200px]" />
                <div className="flex items-center">
                    <Skeleton className="h-4 w-4 mr-2"/>
                    <Skeleton className="h-4 w-[100px]"/>
                </div>
            </div>
        </div>
    )
}