/* eslint-disable @next/next/no-img-element */
interface props {
    id: number,
    name: string,
    filePath: string,
    coverPath: string,
    likes: number,
}

export default function TrackComponent(props: props) {
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
            </div>
        </div>
    )
}