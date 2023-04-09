/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/no-document-import-in-page */
import Head from "next/head";
import { HTMLAttributes } from "react";
import ModalWindow from "./modalWindows";
import NavBar from "./navbar";

export interface props {
    title: string,
    children: any
}

export default function Layout(props: props) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="spotify clone" />
                <meta name="keywords" content="music,spotify,free" />
                <title>{props.title}</title>
            </Head>
                <ModalWindow />
                <NavBar />
                <main className="
                mt-[3.5rem]
                py-[1rem]
                px-[0.5rem]
                bg-neutral-900
                container
                mx-auto
                min-h-[calc(100vh-3.5rem)]
                ">
                    {props.children}
                </main>
        </>
    )
}