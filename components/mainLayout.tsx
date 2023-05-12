import ModalWindow from "./modalWindows"
import NavBar from "./navbar"
import AudioPlayer from "./player/audioPlayer"

interface props {
    children: any
}

export default function MainLayout(props: props) {
    return (
        <>
        <ModalWindow />
        <NavBar />
        <main className="
        mt-[4.2rem]
        pt-[1rem]
        pb-[5rem]
        px-[0.5rem]
        bg-neutral-900
        container
        mx-auto
        min-h-[calc(100vh-4.2rem)]
        ">
            {props.children}
        </main>
        <AudioPlayer />
        </>
    )
}