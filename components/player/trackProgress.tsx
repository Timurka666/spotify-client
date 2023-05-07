export default function TrackProgress() {
    const width = '30rem';
    return (
        <>
        <input
        className={`
        w-[${width}]
        h-[0.5rem]
        `}
        type="range"
        min={0}
        max={100}
        />
        <style jsx>{`
            input[type='range'] {
                overflow: hidden;
                -webkit-appearance: none;
                background-color: #9a905d;
                cursor: pointer;
            }
            
            input[type='range']::-webkit-slider-runnable-track {
                height: 10px;
                -webkit-appearance: none;
                color: #13bba4;
                margin-top: -1px;
            }
            
            input[type='range']::-webkit-slider-thumb {
                width: 10px;
                -webkit-appearance: none;
                height: 10px;
                background: #434343;
                box-shadow: -${width} 0 0 ${width} #43e5f7;
            }
            
            input[type="range"]::-moz-range-progress {
                background-color: #43e5f7; 
            }
            input[type="range"]::-moz-range-track {  
                background-color: #9a905d;
            }
            input[type="range"]::-ms-fill-lower {
                background-color: #43e5f7; 
            }
            input[type="range"]::-ms-fill-upper {  
                background-color: #9a905d;
            }
        `}</style>
        </>
    )
}