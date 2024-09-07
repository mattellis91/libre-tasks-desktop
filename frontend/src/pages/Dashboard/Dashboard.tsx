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
        <div>
            <Sidebar />
            <div className="mt-40">{x}</div>
        </div>
    )
}