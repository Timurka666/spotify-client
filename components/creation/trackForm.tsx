import SelectFileButton from "../selectFile"

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

            <input
            id="input-track"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={(e) => {props.setTrack(e.target.files[0])}}
            />
            <div className="
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
            ">
                <label
                className="
                "
                htmlFor="input-track"
                ><SelectFileButton /></label>
                <div
                className="
                text-neutral-300
                text-2xl
                ">
                    {props.track?.name || 'no file selected'}
                </div>
            </div>
                
            <input
            id="input-cover"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {props.setCover(e.target.files[0])}}
            />
            <div className="
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
            ">
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
                    {props.cover?.name || 'no file selected'}
                </div>
            </div>

        </div>
    )
}