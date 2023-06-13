/* eslint-disable react/no-unescaped-entities */
import Layout from "@/components/layout";
import { useActions } from "@/store";
import { WindowType } from "@/store/modalWindow.slice";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

    return (
        <>
        <Layout title="Home page" />
        <h1 className="
        text-lime-400
        font-bold
        text-4xl
        ">
            Welcome to project "Music Platform"
        </h1>
        <div className="
        text-neutral-400
        text-2xl
        ">
            This project was made by Tarazov Timur with following stack: Next.js, Redux Toolkit, React.js and Nest.js
        </div>
        <div className="
        text-neutral-400
        text-2xl
        ">
            My github account: <a href="https://github.com/Timurka666"
            className="
            text-blue-400
            underline
            hover:text-blue-500
            hover:no-underline
            ">Timurka666</a>
        </div>
        <div className="
        text-neutral-400
        text-2xl
        ">
            This project repository: <a href="https://github.com/Timurka666/spotify-client"
            className="
            text-blue-400
            underline
            hover:text-blue-500
            hover:no-underline
            ">click here</a>
        </div>
        <div className="
        text-neutral-400
        text-2xl
        ">
            Server repository: <a href="https://github.com/Timurka666/spotify-server"
            className="
            text-blue-400
            underline
            hover:text-blue-500
            hover:no-underline
            ">click here</a>
        </div>
        </>
    )
}