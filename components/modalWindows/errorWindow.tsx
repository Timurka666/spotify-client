import { useActions, useTypedSelector } from "@/store"

export default function Error() {
    const {message, type} = useTypedSelector((state) => state.modalWindows);
    const {switchActive} = useActions();
    return (
        <div className="
        w-[35rem]
        h-[20rem]
        bg-neutral-800
        mx-auto
        border-solid
        border-[2px]
        border-neutral-600
        rounded-[20px]
        transition-all
        ">
            <div className="
            h-[15%]
            border-b-solid
            border-b-[2px]
            border-neutral-600
            px-[1rem]
            py-[0.5rem]
            flex
            justify-between
            ">
                <div className="
                text-red-500
                font-bold
                text-2xl
                ">{type}</div>
                <div className="
                text-red-500
                text-xl
                hover:cursor-pointer
                hover:underline
                hover:underline-offset-auto
                "
                onClick={() => {switchActive()}}
                >close window</div>
            </div>
            <div className="
            text-neutral-500
            px-[1rem]
            py-[0.5rem]
            text-xl
            ">{message}</div>
        </div>
    )
}