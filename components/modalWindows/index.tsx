/* eslint-disable react-hooks/exhaustive-deps */
import { useActions, useTypedSelector } from "@/store"
import { WindowType } from "@/store/modalWindow.slice";
import { useEffect, useState } from "react";
import Error from './errorWindow';
import Notification from "./notificationWindow";
import Warning from "./warningWindow";

export default function ModalWindow() {
    const {isActive, message, type} = useTypedSelector((state) => state.modalWindows);
    const [display, setDisplay] = useState('none');
    const [opacity, setOpacity] = useState<number>(0);
    const [window, setWindow] = useState<any>('');
    

    useEffect(() => {
        if (type === WindowType.ERROR) {
            setWindow(<Error />)
        } else if (type === WindowType.NOTIF) {
            setWindow(<Notification />)
        } else if (type === WindowType.WARN) {
            setWindow(<Warning />)
        }
    }, [type]);

    useEffect(() => {
        if (!isActive || !message) {
             setDisplay("none")
             setOpacity(0)
        } else if (isActive && message) {
            setDisplay("flex")
            setOpacity(1)
        }
    }, [isActive, message]);

    return (
        <div className="
        w-[100vw]
        h-[100vh]
        top-0
        left-0
        bg-black/40
        z-10
        flex-col
        justify-around
        transition-opacity
        duration-700
        "
        style={{display: `${display}`, position: "fixed"}}
        >{window}</div>
    )
}