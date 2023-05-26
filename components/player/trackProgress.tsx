import { useActions, useTypedSelector } from "@/store";
import { ChangeEventHandler } from "react";

interface props {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function TrackProgress(props: props) {
    const {length, currentTime} = useTypedSelector(state => state.player);
    return (
        <>
        <div className="flex gap-[1rem]">
            <div className="flex flex-col justify-around">
                <input
                className="w-[20rem]"
                type="range"
                min={0}
                max={length}
                value={currentTime}
                onChange={props.onChange}
                />
            </div>
        <div
        className="
        text-xl
        text-neutral-400
        font-bold
        ">
            {`${currentTime} / ${length}`}
        </div>
        </div>
        <style jsx>{`
            input[type='range'] {
                overflow: hidden;
                -webkit-appearance: none;
                background-color: #737373;
                height: 0.5rem;
                cursor: pointer;
            }
            
            input[type='range']::-webkit-slider-runnable-track {
                -webkit-appearance: none;
                margin-top: -1px;
            }
            
            input[type='range']::-webkit-slider-thumb {
                width: 5px;
                height: 10px;
                -webkit-appearance: none;
                background: #434343;
                box-shadow: -20rem 0 0 20rem #a3e635;
            }
            
            input[type="range"]::-moz-range-progress {
                background-color: #a3e635; 
            }
            input[type="range"]::-moz-range-track {  
                background-color: #737373;
            }
            input[type="range"]::-ms-fill-lower {
                background-color: #a3e635; 
            }
            input[type="range"]::-ms-fill-upper {  
                background-color: #737373;
            }
        `}</style>
        </>
    )
}