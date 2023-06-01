import FileUpload, { FileType } from "../fileUpload"
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
            <div>
                <div
                className="
                text-neutral-300
                text-xl
                "
                >Album cover</div>
                <FileUpload
                id={'input-cover'}
                file={props.file as File}
                setFile={props.setFile}
                type={FileType.IMG}
                />
            </div>
        </div>
    )
}