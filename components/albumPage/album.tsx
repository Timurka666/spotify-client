import { useActions, useTypedSelector } from "@/store"
import { IAlbum } from "@/store/api/interfaces";
import { useRouter } from "next/router";

/* eslint-disable @next/next/no-img-element */
interface props {
    id: number,
    name: string,
    author: string,
    cover: string,
    publisher: string,
    album: IAlbum

}

export default function AlbumComponent(props: props) {
    const router = useRouter()
    const {myAlbums} = useTypedSelector((state) => state.myAlbums);
    const isMyAlbum = myAlbums.filter((el) => el.id === props.id)[0];
    const {playAlbum, showPlayer} = useActions();

    if (!isMyAlbum) {
        return (
            <div
            className="
            flex
            flex-start
            gap-[2rem]
            ">
                <img alt={props.name} src={`${process.env.baseUrl}/${props.cover}`}
                className="
                object-cover
                w-[13rem]
                h-[13rem]
                rounded-[1.5rem]
                "
                />
                <div
                className="
                flex
                flex-col
                justify-start
                gap-[1.5rem]
                "
                >
                    <div
                    className="
                    text-3xl
                    text-neutral-500
                    font-bold
                    "
                    >Name: {props.name}</div>
                    <div
                    className="
                    text-3xl
                    text-neutral-500
                    "
                    >Author: {props.author}</div>
                    <div
                    className="
                    text-3xl
                    text-neutral-500
                    "
                    >Publisher: {props.publisher}</div>
                </div>
                <button className="
                block
                text-lime-400
                text-xl
                font-bold
                align-middle
                text-center
                h-[2.5rem]
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
                "
                onClick={(e) => {playAlbum(props.album); showPlayer()}}
                >Play album</button>
            </div>
        )
    }

    return (
        <div
        className="
        flex
        flex-start
        gap-[2rem]
        ">
            <img alt={props.name} src={`${process.env.baseUrl}/${props.cover}`}
            className="
            object-cover
            w-[13rem]
            h-[13rem]
            rounded-[1.5rem]
            "
            />
            <div
            className="
            flex
            flex-col
            justify-start
            gap-[1.5rem]
            "
            >
                <div
                className="
                text-3xl
                text-neutral-500
                font-bold
                "
                >Name: {props.name}</div>
                <div
                className="
                text-3xl
                text-neutral-500
                "
                >Author: {props.author}</div>
                <div
                className="
                text-3xl
                text-neutral-500
                "
                >Publisher: {props.publisher}</div>
            </div>
            <button
            className="
            block
            text-lime-400
            text-xl
            font-bold
            align-middle
            text-center
            h-[2.5rem]
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
            "
            onClick={(e) => {router.push(`/album/${props.id}/createTrack`)}}
            >Add new track</button>
            <button className="
            block
            text-lime-400
            text-xl
            font-bold
            align-middle
            text-center
            h-[2.5rem]
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
            "
            onClick={(e) => {playAlbum(props.album); showPlayer()}}
            >Play album</button>
        </div>
    )

}