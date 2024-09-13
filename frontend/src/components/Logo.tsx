import { cn } from "@/lib/utils"
import logo from "../assets/logo.svg";

export const Logo = () => {
    return (
        <a href="/">
            <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex pl-4">
                <img src={logo} alt="logo" height={20} width={20} />
                <p className={cn("pb-1 font-semibold")}>
                    Libre Tasks
                </p>
            </div>
            
        </a>
    )
}