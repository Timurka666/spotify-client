
import { useTypedSelector } from "@/store";
import Image  from "next/image";
import TrackProgress from "./trackProgress";


export default function AudioPlayer() {
    const {currentAlbum, currentTime, currentTrack, isPlayed, isShown, volume} = useTypedSelector(state => state.player);
    const audio = new Audio();
    audio.src = `${process.env.baseUrl}/${currentTrack?.filePath}`;
    return (
        <div
        className="
        fixed
        top-[calc(100vh-3.5rem)]
        left-[0px]
        w-[100vw]
        h-[3.5rem]
        bg-neutral-900
        border-t-solid
        border-t-[1px]
        border-t-neutral-600
        flex
        flex-col
        justify-around
        "
        style={{}}>
            <div className="
            mx-auto
            container
            ">
                <div className="
                flex
                justify-between
                w-[100%]
                ">
                    <Image src="/icons/backwardButton.svg" alt="" width="32" height="32" />
                    <Image src="/icons/playButton.svg" alt="" width="32" height="32" />
                    <Image src="/icons/forwardButton.svg" alt="" width="32" height="32" />
                    <TrackProgress />
                </div>
            </div>
        </div>
    )
}