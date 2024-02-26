import React, { useState } from 'react';
import uploadIcon from '../assets/126477.png'
import {FileDisplay} from './FileDisplay'
import { Button } from "@/components/ui/button"


export function Pdfuploader({setJobCardVisibility,setFiles, files, setMainViewOpacity})
{
    const handleFileChange = (event) => {
        const uploadedFiles = event.target.files;
        setFiles([...files, ...uploadedFiles]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const uploadedFiles = event.dataTransfer.files;
        setFiles([...files, ...uploadedFiles]);
    };

    
    
    
    

    return<>
        <div class = "flex w-2/5 h-36 mx-auto justify-center mt-5 border-2 border-sky-600 border-solid rounded-xl " onDrop={handleDrop}
            onDragOver={handleDragOver}>
            <img src={uploadIcon} alt="Upload Icon" class="mt-8 h-10 absolute" />
            <input type='file' id = "pdfuploader" class = "flex hidden" onChange={handleFileChange}></input>
            <label for = "pdfuploader" class = "mt-20 text-blue-800"> Click to Upload PDF or Drag and Drop</label>
        </div>
        {files.length>0 &&
            (
                <div class="flex flex-col gap-y-2">
                    <div class = "flex flex-col mx-auto h-fit mt-2 w-2/5 gap-y-2">
                        {files.map((file)=>{
                            return <FileDisplay name = {file.name}></FileDisplay>
                        })}
                    </div>
                    <div class = "flex justify-center mx-auto h-10 mt-2 w-2/5 gap-x-2 ">
                        <Button 
                            class = "w-40 border-2 rounded-md border-b-stone-50 font-bold" 
                            onClick={()=>{
                                setFiles([]);
                        }}>
                            Cnacel
                        </Button>
                        <Button class = "w-40 border-2 rounded-md border-b-stone-50 bg-blue-500 text-slate-50" onClick={()=>{
                            setJobCardVisibility(true);
                            setMainViewOpacity(0.05);
                        }}>Attach Files</Button>
                    </div>
                </div>
            )
        }
    </>
     
}