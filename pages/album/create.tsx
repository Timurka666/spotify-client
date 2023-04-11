import Layout from "@/components/layout";
import SelectFileButton from "@/components/selectFile";
import { useActions } from "@/store";
import { useUploadAlbumMutation } from "@/store/api";
import { WindowType } from "@/store/modalWindow.slice";
import { useEffect, useState } from "react";
import {redirect, useRouter} from 'next/navigation';

export default function CreateAlbum() {
    const {push} = useRouter();
    const {callWindow} = useActions();
    const [uploadAlbum, {data, isSuccess}] = useUploadAlbumMutation();
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [file, setFile] = useState<File>();
    const form  = new FormData();
    //form.append('cover', file || '', file?.name);
    const submitHandler = async () => {
        if (!name || !author || !file) {
            return callWindow({message: 'fill all inputs!', type: WindowType.ERROR});
        }
        form.set('cover', file || '', file?.name);
        form.set('name', name);
        form.set('author', author);
        await uploadAlbum(form);
    }

    useEffect(() => {
        if (isSuccess) {
            callWindow({message: 'A new album has been created', type: WindowType.NOTIF});
            push('/account');
        }
    }, [isSuccess]);


    return (
        <Layout title="New album">
            <div className="
            flex
            flex-col
            gap-[2rem]
            w-[50rem]
            ">
                <input
                type="text"
                name="name"
                value={name}
                placeholder="Album name"
                className="
                block
                bg-white/0
                h-[2.3rem]
                border-solid
                border-[2px]
                rounded-[5px]
                border-neutral-600
                text-neutral-300
                px-[0.5rem]
                "
                onChange={(e) => {setName(e.target.value)}}
                 />
                
                <input
                type="text"
                name="author"
                value={author}
                placeholder="Album author"
                className="
                block
                bg-white/0
                h-[2.3rem]
                border-solid
                border-[2px]
                rounded-[5px]
                border-neutral-600
                text-neutral-300
                px-[0.5rem]
                "
                onChange={(e) => {setAuthor(e.target.value)}}
                 />

                <div
                className="
                flex
                justify-start
                w-[30rem]
                bg-white/0
                h-[2.3rem]
                border-solid
                border-[2px]
                rounded-[10px]
                border-neutral-600
                gap-[2rem]
                "
                >
                <input
                id="input-cover"
                type="file"
                name="cover"
                accept="image/*"
                className="hidden"
                onChange={(e) => {setFile(e.target.files[0])}}
                 />
                <label
                className="
                "
                htmlFor="input-cover"
                ><SelectFileButton /></label>
                <div
                className="
                text-neutral-300
                text-2xl
                ">
                    {file?.name || 'no file selected'}
                </div>
                </div>

                <button
                className="
                block
                text-lime-400
                text-xl
                font-bold
                align-middle
                text-center
                w-[20rem]
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
                onClick={() => {submitHandler()}}>Create new album</button>
            </div>
        </Layout>
    )
}