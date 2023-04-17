/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

interface props {
    imagePath: string,
    albumName: string,
    albumAuthor: string,
    albumId: number
}

export default function AlbumComponent(props: props) {
    return (
        <Link className="
        flex
        gap-[0.5rem]
        h-auto
        px-[0.7rem]
        py-[0.3rem]
        border-solid
        border-[1px]
        border-neutral-500
        rounded-[1.5rem]
        hover:bg-neutral-800
        transition-all
        "
        href={`/album/${props.albumId}`}
        >
           <img
            src={`${process.env.baseUrl}/${props.imagePath}`}
            alt=""
            className="
            object-cover
            w-[7rem]
            h-[7rem]
            rounded-[1.5rem]
            " />
            <div>
                <div
                className="
                text-3xl
                text-neutral-500
                "
                >Name: {props.albumName}</div>
                <div
                className="
                text-xl
                text-neutral-500
                "
                >Author: {props.albumAuthor}</div>
            </div>
        </Link>
    )
}