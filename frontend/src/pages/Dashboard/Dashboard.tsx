import { useEffect, useState } from "react";
import { GetTestJSON } from "../../../wailsjs/go/main/App"
import { Sidebar } from "../../components/sidebar";


export default function Dashboard() {

    const [x, setX] = useState<string | null>(null);

    useEffect(() => {
        async function getTestData() {
            const y = await GetTestJSON();
            setX(y);
        }
        getTestData();
    }, [])
    
    return (
        <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
            <div className="flex gap-x-7">
                <div className="w-64 shrink-0 hidden md:block">
                    <Sidebar />
                </div>
                <div className="flex flex-col space-y-4">
                    <div className="space-y-2">
                        {x}
                    </div>
                </div>
            </div>
        </main>
    )
}