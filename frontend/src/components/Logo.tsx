import { cn } from "@/lib/utils"
import logo from "../assets/logo.svg";

export const Logo = () => {
    return (
        <a href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
                <img src={logo} alt="logo" height={30} width={30} />
                <p className={cn("text-lg pb-1")}>
                    Taskify
                </p>
            </div>
            
        </a>
    )
}