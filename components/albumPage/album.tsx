/* eslint-disable @next/next/no-img-element */
interface props {
    name: string,
    author: string,
    cover: string,
    publisher: string

}

export default function AlbumComponent(props: props) {
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
        </div>
    )
}