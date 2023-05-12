import { useActions, useTypedSelector } from "@/store";
import { ChangeEventHandler } from "react";

interface props {
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function VolumeProgress(props: props) {
    const {volume} = useTypedSelector(state => state.player);
    const width = '5rem';
    const height = '0.5rem';
    return (
        <>
        <input
        className={`w-[${width}]`}
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={props.onChange}
        />
        <style jsx>{`
            input[type='range'] {
                overflow: hidden;
                -webkit-appearance: none;
                background-color: #737373;
                height: ${height};
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
                box-shadow: -5rem 0 0 5rem #a3e635;
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