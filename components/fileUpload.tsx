import { ChangeEvent, DetailedHTMLProps, DragEvent, InputHTMLAttributes, RefObject, useRef, useState } from "react"
import Image from "next/image";
import { useActions } from "@/store";
import { WindowType } from "@/store/modalWindow.slice";

export enum FileType {
    IMG = '.jpg, .jpeg, .png',
    AUDIO = '.mp3, .mpeg'
}
export type allowedExt = (`.${string}`)[];

interface props {
    id: string | number,
    setFile: Function,
    file: File,
    type: FileType,
}
export default function FileUpload(props: props) {
    const {callWindow} = useActions();

    const inputRef = useRef<any>();
    const [dragActive, setActive] = useState(false);

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null) {
            props.setFile(e.target.files[0])
        }
    }
    const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setActive(true);
        } else if (e.type === "dragleave") {
            setActive(false);
        }
    }
    const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setActive(false);
        const ext = props.type.split(', ');
        const isAllowedExt = ext.filter(el => e.dataTransfer.files[0].name.endsWith(el));
        if (e.dataTransfer.files && e.dataTransfer.files[0] && isAllowedExt[0]) {
           props.setFile(e.dataTransfer.files[0])
        } else if (!isAllowedExt[0]) {
            callWindow({message: 'Wrong type', type: WindowType.ERROR})
        }

    }

    return (
        <>
            <input
            ref={inputRef}
            id={props.id as string}
            type="file"
            accept={props.type}
            className="hidden"
            
            onChange={handleFile}
            />
            <label
            className="
            w-[30rem]
            h-[20rem]
            border-dashed
            border-[0.4rem]
            border-neutral-600
            flex
            flex-col
            justify-around
            transition-all
            "
            style={{borderColor: `${
                dragActive ?
                '#d4d4d4' :
                '#525252'
            }`}}
            htmlFor={props.id as string}
            onClick={(e) => {e.preventDefault()}}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            >
                <div
                className="
                block
                mx-auto
                text-neutral-400
                text-center
                text-2xl
                "
                >
                    Drag & drop a file or press the button
                </div>
                <Image
                src="/icons/upload.svg"
                alt="upload icon"
                width="64"
                height="64"
                className="
                mx-auto"
                />
                <button
                className="
                mx-auto
                block
                text-lime-400
                text-xl
                font-bold
                text-center
                w-[10rem]
                px-[0.5rem]
                py-[0.2rem]
                border-lime-400
                border-[2px]
                rounded-[10px]
                hover:border-neutral-800
                hover:bg-lime-400
                hover:text-neutral-800
                hover:cursor-pointer
                transition-all
                "
                onClick={(e) => {inputRef.current?.click()}}
                >Select a file</button>
                <div
                className="
                block
                mx-auto
                text-neutral-400
                text-xl
                text-center
                "
                >
                    {props.file?.name || 'No file selected'}
                </div>
            </label>
        </>
    )
}