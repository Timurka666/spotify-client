import { useActions, useTypedSelector } from "@/store"
import { useDeleteTrackMutation } from "@/store/api";
import { WindowType } from "@/store/modalWindow.slice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";

/* eslint-disable @next/next/no-img-element */
interface props {
    id: number,
    name: string,
    filePath: string,
    coverPath: string,
    likes: number,
}

export default function TrackComponent(props: props) {
    const {tracks} = useTypedSelector((state) => state.myAlbums);
    const {closePlayer, deleteTrack: delTrack, callWindow, removeTrack} = useActions();
    const isMyTrack = tracks.filter((el) => el.id === props.id)[0];
    const [deleteTrack, {data, isSuccess}] = useDeleteTrackMutation();
    const router = useRouter();

    useEffect(() => {
        if (isSuccess && data) {
            closePlayer();
            delTrack(props.id);
            removeTrack(props.id);
            callWindow({message: data?.message, type: WindowType.NOTIF});
        }
    }, [isSuccess]);
    return (
        <div className="
        flex
        gap-[1rem]
        ">
            <img
            src={`${process.env.baseUrl}/${props.coverPath}`}
            alt={props.name}
            className="
            object-cover
            w-[9rem]
            h-[9rem]
            rounded-[1.5rem]
            "
            />
            <div className="
            flex
            flex-col
            justify-start
            gap-[0.3rem]
            ">
                <div
                className="
                text-2xl
                text-neutral-500
                font-bold
                "
                >{props.name}</div>
                
                <div
                className="
                text-xl
                text-neutral-500
                "
                >likes: {props.likes}</div>
                {
                    isMyTrack
                    &&
                    <Image
                    src="/icons/trashBin.svg"
                    alt=""
                    width="48"
                    height="48"
                    className="
                    hover:cursor-pointer
                    "
                    onClick={() => {deleteTrack(props.id)}}
                    />
                }
            </div>
        </div>
    )
}