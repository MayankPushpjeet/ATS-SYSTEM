import { CandidateProfileView } from "./CandidateProfileView";
import { useState } from "react";
export function AnalysedResumeView({resumeData})
{
    const [candidateProfileVisible, setCandidateProfileVisible] = useState(false);
    return <div class = "flex justify-between mt-2 h-16 px-6 items-center ">
        <div class="flex flex-row" style = {{width : '25%'}}>
            <div class="flex justify-center items-center h-10 w-10 rounded-full bg-slate-100">
                {resumeData.personal_details.name[0]}
            </div>
            <div class="flex flex-col ml-6">
                <div className="flex text-lg text-slate-600 font-bold h-fit">{resumeData.personal_details.name}</div>
                <div className="flex text-sm text-gray-400 mt-1 h-fit">{resumeData.personal_details.email}</div>
            </div>
        </div>
        <div class ="flex text-slate-600 text-left" style = {{width : '25%'}}>{resumeData.relevancy_score}</div>
        <div class="flex flex-row justify-between" style = {{width : '25%'}}>
            <div class="text-blue-600 w-5/12">Link</div>
            <button class="w-5/12" onClick={()=>{
                setCandidateProfileVisible(true);
            }}>View details</button>
        </div>
        <CandidateProfileView candidateProfileVisible = {candidateProfileVisible}
        setCandidateProfileVisible = {setCandidateProfileVisible}
        resumeData = {resumeData}
        ></CandidateProfileView>
    </div>
}