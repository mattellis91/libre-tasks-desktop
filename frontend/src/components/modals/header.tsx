import { Layout } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
    data:any
    list:string
}
export const Header = ({data, list}: HeaderProps) => {

    const [title, setTitle] = useState(data.title);

   return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
        <Layout className="h-5 w-5 mt-1 text-stone-100"/>
        <div className="w-full">
            <form>
                <input id="title" defaultValue={title} className="font-semibold text-xl px-1 text-stone-100 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-[#282828] focus-visible:border-input mb-0.5 truncate"/>
            </form>
            <p className="text-sm text-stone-300" onClick={setTitle}>
                in list <span className="underline">{list}</span>
            </p>
        </div>
    </div>
   ) 
};