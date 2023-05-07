/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/no-document-import-in-page */
import Head from "next/head";
import { HTMLAttributes } from "react";
import ModalWindow from "./modalWindows";
import NavBar from "./navbar";
import AudioPlayer from "./player/audioPlayer";

export interface props {
    title: string,
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
        </>
    )
}