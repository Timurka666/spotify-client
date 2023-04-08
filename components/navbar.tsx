import { useTypedSelector } from "@/store";
import { selectJwt } from "@/store/jwt.slice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function NavBar() {
    const [show, setShow] = useState(false)
    const jwt = useTypedSelector((state) => state.jwt.jwt)

    useEffect(() => {
        if (!jwt) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [jwt])

    return (
        <nav className="
        flex
        flex-col
        justify-middle
        fixed
        top-[0px]
        left-[0px]
        w-[100vw]
        h-[3.5rem]
        bg-neutral-800">
            <div className="
            h-auto
            flex
            justify-between
            container
            mx-auto">
                <div className="
                font-sonic
                tracking-normal
                leading-tight
                text-2xl
                text-lime-400
                align-middle
                ">music<br />platform</div>
                <ul className="
                flex
                justify-around
                gap-[1rem]
                mt-[0.5rem]">
                    <li><Link
                    href="/registration"
                    className="
                    block
                    text-lime-400
                    text-xl
                    font-bold
                    align-middle
                    text-center
                    w-auto
                    px-[0.5rem]
                    py-[0.2rem]
                    border-lime-400
                    border-[2px]
                    rounded-[10px]
                    hover:border-neutral-800
                    hover:bg-lime-400
                    hover:text-neutral-800
                    transition-all
                    ">Sign up</Link></li>
                    {!show ? 
                    <li><Link
                    href="/login"
                    className="
                    block
                    text-lime-400
                    text-xl
                    font-bold
                    align-middle
                    text-center
                    w-auto
                    px-[0.5rem]
                    py-[0.2rem]
                    border-solid
                    border-lime-400
                    border-[2px]
                    rounded-[10px]
                    hover:border-neutral-800
                    hover:bg-lime-400
                    hover:text-neutral-800
                    transition-all
                    ">Sign in</Link></li> :
                    <li><Link
                    href="/account"
                    className="
                    block
                    text-lime-400
                    text-xl
                    font-bold
                    align-middle
                    text-center
                    w-auto
                    px-[0.5rem]
                    py-[0.2rem]
                    border-solid
                    border-lime-400
                    border-[2px]
                    rounded-[10px]
                    hover:border-neutral-800
                    hover:bg-lime-400
                    hover:text-neutral-800
                    transition-all
                    ">My account</Link></li>
                    }
                </ul>
            </div>
        </nav>
    )
}