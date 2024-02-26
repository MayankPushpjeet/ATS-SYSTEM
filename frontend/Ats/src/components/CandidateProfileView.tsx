import { useState } from 'react'
import crossicon  from '../assets/cross_3.svg'
import { CollageView } from './CollageView';
import { ProfessionalExperienceView } from './ProfessionalExperienceView';
import { ProjectsView } from './ProjectsView';

export function CandidateProfileView({resumeData,candidateProfileVisible,setCandidateProfileVisible})
{   const [view, setView] = useState(0);
    const renderView = () => {
        switch (view) {
          case 0:
            return <CollageView resumeData = {resumeData}/>;
          case 1:
            return <ProjectsView  resumeData = {resumeData}/>;
          case 2: // Corrected typo from Response A (2 instead of 3)
            return <ProfessionalExperienceView  resumeData = {resumeData}/>;
          default:
            return null; // Handle unexpected view values gracefully
        }
    };
    return candidateProfileVisible ? (
        <div class = "fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  mx-auto w-1/3 h-4/6 py-4 border-2 border-b-stone-50 rounded-xl bg-white">
            <div class="flex flex-row justify-between px-4 h-10">
                <div class="flex justify-center items-center h-10 w-10 rounded-full bg-gray-100">{resumeData.personal_details.name[0]}</div>
                <button class="flex flex-row justify-between h-8 w-8 border-2 items-center border-b-stone-50 rounded-sm" onClick={()=>{
                    setCandidateProfileVisible(false);
                }}>
                    <img src = {crossicon} class="flex self-center h-3/4 ml-1" alt="Cross Icon"></img>
                </button>
            </div>
            <div class="flex flex-col h-fit mt-4">
                <div class = "flex h-fit px-4 text-xl font-bold">{resumeData.personal_details.name}</div>
                <div class = "flex h-fit px-4 text-s text-slate-600 mt-1">{resumeData.personal_details.email}</div>
            </div>
            <div class = "flex justify-start w-fit h-14 ml-4 mt-4 border-b-stone-50 rounded-s bg-slate-200">
                    <button class = "flex w-28 h-14 items-center " onClick={()=>{
                        setView(0);
                    }}>
                        <div class = {`flex mx-1 h-10 items-center px-2 ${view===0 ? 'bg-white rounded-md' : ''}`}>College</div>
                    </button>
                    <button class = "flex w-28 px-2 items-center" onClick={()=>{
                        setView(1);
                    }}>
                        <div class = {`flex mx-1 h-10 items-center px-2 ${view===1 ? 'bg-white rounded-md' : ''}`}>Projects</div>
                    </button>
                    <button class = "flex w-56 px-2 items-center" onClick={()=>{
                        setView(2);
                    }}>
                        <div class = {`flex mx-1 h-10 items-center px-2 ${view===2 ? 'bg-white rounded-md' : ''}`} >Professional Experiences</div>
                    </button>
            </div>
            {renderView()}
        </div>
    ) : null;

}