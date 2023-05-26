/* eslint-disable @next/next/no-img-element */

import { useActions, useTypedSelector } from "@/store";
import Image  from "next/image";
import { useEffect, useState } from "react";
import TrackProgress from "./trackProgress";
import VolumeProgress from "./volumeProgress";

let audio: HTMLAudioElement;

export default function AudioPlayer() {
    const {currentAlbum, currentTime, currentTrack, isPlayed, isShown, volume} = useTypedSelector(state => state.player);
    const {closePlayer, setLength, setCurrentTime, playTrack, pauseTrack, setVolume, switchToNext, switchToPrev} = useActions();
    const [coverPath, setPath] = useState('');
    const [position, setPosition] = useState('100vh');

    const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
            audio.currentTime = Number(e.target.value);
            setCurrentTime(Number(e.target.value));
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100;
        setVolume(Number(e.target.value));
}

    const setAudio = () => {
        if (currentTrack && isPlayed) {
            audio.src = `${process.env.baseUrl}/${currentTrack?.filePath}`;
            audio.volume = volume / 100;
            audio.onloadedmetadata = () => {
                setLength(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
            setPath(`${process.env.baseUrl}/${currentTrack?.coverPath}`);
            audio.onended = () => {switchToNext()}
        }
    }

    const play = () => {
            audio.play();
            playTrack();
    }
    const pause = () => {
        audio.pause();
        pauseTrack();
}

    useEffect(() => {
        if (!audio) {
            audio = new Audio();
        } else {
            setAudio();
            play();
        }
    }, [currentTrack]);

    useEffect(() => {
        if (isShown) {
            setPosition('calc(100vh - 4.5rem)');
        } else {
            setPosition('100vh')
        }
    }, [isShown])

    return (
        <div
        className="
        fixed
        left-[0px]
        w-[100vw]
        h-[4.5rem]
        bg-neutral-900
        border-t-solid
        border-t-[1px]
        border-t-neutral-600
        flex
        flex-col
        justify-around
        transition-all
        "
        style={{top: `${position}`}}>
            <div className="
            mx-auto
            container
            ">
                <div className="
                flex
                justify-between
                ">
                    <div className="
                    flex
                    gap-[0.2rem]
                    ">
                        <img
                        src={coverPath}
                        alt="cover"
                        className="
                        object-cover
                        rounded-[0.3rem]
                        w-[4rem]
                        h-[4rem]
                        "
                        />
                        <div className="
                        text-3xl
                        text-neutral-400
                        ">
                            {currentTrack?.name}
                        </div>
                    </div>
                    <Image
                    className="
                    hover:cursor-pointer
                    "
                    onClick={() => {switchToPrev()}}
                    src="/icons/backwardButton.svg"
                    alt=""
                    width="32"
                    height="32"
                    />
                    {isPlayed ? 
                    <Image
                    className="
                    hover:cursor-pointer
                    "
                    onClick={pause}
                    src="/icons/pauseButton.svg"
                    alt=""
                    width="32"
                    height="32"
                    /> :
                    <Image
                    className="
                    hover:cursor-pointer
                    "
                    onClick={play}
                    src="/icons/playButton.svg"
                    alt=""
                    width="32"
                    height="32"
                    />
                    }
                    <Image
                    className="
                    hover:cursor-pointer
                    "
                    onClick={() => {switchToNext()}}
                    src="/icons/forwardButton.svg"
                    alt=""
                    width="32"
                    height="32"
                    />
                    <div className="
                    mt-[1rem]
                    ">
                        <TrackProgress
                        onChange={changeTime}
                        />
                    </div>
                    <div className="
                    mt-[1rem]
                    ">
                        <VolumeProgress
                        onChange={changeVolume}
                        />
                    </div>
                    <Image
                    className="
                    hover:cursor-pointer
                    "
                    onClick={() => {closePlayer(); pause(); audio = new Audio()}}
                    src="/icons/cross.svg"
                    alt=""
                    width="32"
                    height="32"
                    />
                </div>
            </div>
        </div>
    )
}