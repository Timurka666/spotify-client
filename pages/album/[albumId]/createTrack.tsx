import TrackForm from "@/components/creation/trackForm";
import Layout from "@/components/layout";
import { useActions } from "@/store";
import { useAddNewTrackMutation } from "@/store/api";
import { WindowType } from "@/store/modalWindow.slice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CreateTrack() {
    const router = useRouter();
    const {callWindow, pushAlbum, pushTrack} = useActions();
    const [create, {isSuccess, data}] = useAddNewTrackMutation();
    const [name, setName] = useState('');
    const [cover, setCover] = useState<File>();
    const [track, setTrack] = useState<File>();
    const [albumId, setAlbumId] = useState(router.query.albumId);
    const form = new FormData();

    const submitHandler = async () => {
        if (!name || !cover || !track || !router.query.albumId) {
            return callWindow({message: 'fill all inputs!', type: WindowType.ERROR});
        }
        form.set('cover', cover || '', cover?.name);
        form.set('audio', track || '', track?.name);
        form.set('name', name);
        form.set('albumId', albumId as string)
        await create(form);
    }
    useEffect(() => {
        if (isSuccess && data) {
            callWindow({message: 'A new track has been created', type: WindowType.NOTIF});
            pushTrack({track: data, albumId: Number(router.query.albumId)})
            router.push(`/album/${router.query.albumId}`);
        }
    }, [isSuccess]);

    return (
        <>
        <Layout title="create new track" />
           <TrackForm
           cover={cover}
           setCover={setCover}
           track={track}
           setTrack={setTrack}
           name={name}
           setName={setName}
           />
           <button className="
           mt-[2rem]
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
           onClick={(e) => {submitHandler()}}
           >create new track</button>
        </>
    )
}