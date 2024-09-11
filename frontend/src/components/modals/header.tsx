import { Layout } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
    data:any
}
export const Header = ({data}: HeaderProps) => {

    const [title, setTitle] = useState(data.title);

   return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
        <Layout className="h-5 w-5 mt-1 text-neutral-700"/>
        <div className="w-full">
            <form>
                <input id="title" defaultValue={title} className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate"/>
            </form>
            <p className="text-sm text-muted-foreground" onClick={setTitle}>
                in list <span className="underline">{data.list.title}</span>
            </p>
        </div>
    </div>
   ) 
};