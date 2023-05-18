import { MouseEventHandler, useState } from 'react'
import { IProduct } from '../models/product'
import { Link } from 'react-router-dom'
import { Html, useProgress } from '@react-three/drei'

interface LoadingScreenProps {
    started: boolean,
    onStarted: MouseEventHandler
}


export const LoadingScreen = () => {
    const { progress } = useProgress();


    return (
        // <Html center className=' bg-slate-500 w-full h-full'>🌀 Loading...</Html>
        <div  className={` transition-all absolute h-full w-full top-0 right-0 left-0 bottom-0 flex justify-center items-center ${progress==100 && ' hidden'}`}>
            <div>
                <div className=' w-64 h-4  rounded-full border-white border-2 flex items-center p-[2px]'>
                    <div
                        className=' bg-white h-full transition duration-300 rounded-full'
                        style={{
                             width: `${progress}%`,
                         }}
                    ></div>
                    {/* {progress} */}
                </div>
            </div>

            {/* <div className=" h-10">
                <div
                    className=" bg-red-500"
                >{progress}</div>
            </div>
            <div className="loadingScreen__board">
                <h1 className="loadingScreen__title">Please help me!</h1>
                <button
                    className=" bg-orange-600 rounded-lg p-4 px-6"
                    disabled={progress < 100}
                    onClick={onStarted}
                >
                    Start
                </button>
            </div> */}
        </div>
    );
}
