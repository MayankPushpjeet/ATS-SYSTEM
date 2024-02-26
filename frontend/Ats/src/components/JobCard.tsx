import flagicon from '../assets/flag-svgrepo-com.svg';
import crossicon from '../assets/cross_3.svg';
import { useState } from 'react';

export function JobCard({ visible, setMainViewOpacity, setJobCardVisibility, handleFileUpload, setFiles, setJobTitle, setJobDescription, setToggleResultView}) {
    
    return visible ? (
        <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col mx-auto w-1/4 h-auto py-4 border-2 border-b-stone-50 rounded-sm bg-zinc-300">
            <div class="flex justify-between h-10 px-4 py-4">
                <img src={flagicon} class="flex h-8 w-8 border-2 border-b-stone-50 rounded-sm" alt="Flag Icon"></img>
                <div>
                    <button class="flex flex-row justify-between h-8 w-8 border-2 items-center border-b-stone-50 rounded-sm" onClick={()=>{
                        setJobCardVisibility(false);
                        setMainViewOpacity(1);
                    }}>
                        <img src={crossicon} class="flex self-center h-3/4 ml-1" alt="Cross Icon"></img>
                    </button>
                </div>
            </div>
            <div class="flex flex-col justify-center h-60 px-4 py-4">
                <div class="text-left font-bold mt-4">Add Role</div>
                <div class="text-left text-xs mt-1">Add the job description</div>
                <div class="mt-6 text-xs">Role*</div>
                <input type='text' placeholder='Enter Job title ' class="flex h-5 mt-1 px-2" onChange={(event)=>{
                    setJobTitle(event.target.value);
                }}></input>
                <div class="flex mt-2">Job Description*</div>
                <input type='text' placeholder='Enter Job Description ' class="flex h-16 mt-1 px-2" onChange={(event)=>{
                    setJobDescription(event.target.value);
                }}></input>
            </div>
            <div class="flex justify-between px-4 mx-auto h-8 mt-0.5 w-full gap-x-2">
                <button
                    class="w-5/12 border-2 rounded-md border-b-stone-50 font-bold"
                    onClick={() => {
                        setFiles([]);
                        setJobCardVisibility(false);
                        setMainViewOpacity(1);
                    }}>
                    Cancel
                </button>
                <button class="w-5/12 border-2 rounded-md border-b-stone-50 bg-blue-500 text-slate-50 " onClick={()=>{
                    setMainViewOpacity(1);
                    setJobCardVisibility(false);
                    handleFileUpload().then(()=>{
                        setToggleResultView(true);
                    });
                }}>Submit</button>
            </div>
        </div>
    ) : null;
}
