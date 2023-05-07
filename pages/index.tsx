import Layout from "@/components/layout";
import { useActions } from "@/store";
import { WindowType } from "@/store/modalWindow.slice";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const {callWindow} = useActions();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count > 10) {
            callWindow({message: 'stop clicking!!!', type: WindowType.WARN})
        }
    }, [count])

    return (
        <>
        <Layout title="Home page" />
            <div className="text-3xl">Home page</div>
            <h1 className="text-2xl mt-[3rem]">{count}</h1>
            <button className="
            block
            border-rose-300
            border-solid
            border-[0.2rem]
            rounded-[5px]
            w-[5rem]
            bg-yellow
            mb-[3rem]"
            onClick={() => {setCount(count + 1)}}
            >count</button>
            <Link href={"/registration"} className="text-blue-400">registration</Link>
        </>
    )
}