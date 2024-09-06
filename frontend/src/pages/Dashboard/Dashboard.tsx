import { useEffect, useState } from "react";
import { GetTestJSON } from "../../../wailsjs/go/main/App"

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
        <div className="mt-40">{x}</div>
    )
}