import FileUpload, { FileType } from "../fileUpload"


interface props {
    name: string,
    cover: File,
    track: File,
    setName: Function,
    setCover: Function,
    setTrack: Function
}

export default function TrackForm(props: props) {
    return (
        <div className="
        flex
        flex-col
        gap-[2rem]
        w-[100%]
        ">
            <input
            type="text"
            name="name"
            placeholder="Track name"
            value={props.name}
            onChange={(e) => {props.setName(e.target.value)}}
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
            />
            <div className="flex justify-around">
                <div>
                    <div
                    className="
                    text-neutral-300
                    text-xl
                    "
                    >New track</div>
                    <FileUpload
                    id={5}
                    setFile={props.setTrack}
                    type={FileType.AUDIO}
                    file={props.track}
                    />  
                </div>
                <div>
                    <div
                    className="
                    text-neutral-300
                    text-xl
                    "
                    >Cover</div>
                    <FileUpload
                    id={6}
                    setFile={props.setCover}
                    type={FileType.IMG}
                    file={props.cover}
                    />
                </div>
            </div>

        </div>
    )
}