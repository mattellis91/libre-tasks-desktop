import { Logo } from "./Logo";
import { ThemeToggle } from "./theme-toggle";
import { Cog } from "lucide-react";
import { Button } from "./ui/button";
// import { User } from "lucide-react";

export const Navbar = () => {
    return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-background flex items-center">
            <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    {/* <Button size="sm" variant="outline" asChild>
                        <a href="/sign-in">
                            Login
                        </a>
                    </Button>
                    <Button size="sm" variant="default">
                        <a href="/sign-up">
                            Get Taskify for free
                        </a>
                    </Button> */}
                    {/* <Button variant="ghost" size="sm">
                        <User />
                    </Button> */}
                    <Button variant="ghost" size="sm">
                        <Cog />
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};
