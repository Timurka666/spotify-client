import SelectFileButton from "../selectFile"

interface props {
    name: string,
    author: string,
    file: File | undefined,
    setName: Function,
    setAuthor: Function,
    setFile: Function
}

export default function AlbumForm(props: props) {
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
            value={props.name}
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
            onChange={(e) => {props.setName(e.target.value)}}
             />
                
            <input
            type="text"
            name="author"
            value={props.author}
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
            onChange={(e) => {props.setAuthor(e.target.value)}}
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
            onChange={(e) => {props.setFile(e.target.files[0])}}
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
                {props.file?.name || 'no file selected'}
            </div>
            </div>
        </div>
    )
}