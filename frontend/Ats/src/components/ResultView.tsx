import { ResumeDisplay } from "./ResumeDisplay"

export function ResultView({lowRelevancy , highRelevancy})
{
    highRelevancy.sort((a, b) => b.relevancy_score - a.relevancy_score);
    lowRelevancy.sort((a, b) => b.relevancy_score - a.relevancy_score);
    return <div class = "flex flex-col h-fit">
            <div class = "flex flex-col px-10 py-10 h-28">
                <div class = "text-2xl text-slate-950 font-bold">{highRelevancy.length} Resumes Filtered</div>
                <div class = " text-sm text-gray-400 mt-1 h-fit">Purpose Selection</div>
            </div>
            <div class = "flex h-1 mt-1 mx-10 bg-slate-100"></div>
            <ResumeDisplay title="Recommended Profiles" description="Resumes fir for the job role" resumes = {highRelevancy} ></ResumeDisplay>
            <ResumeDisplay title="Non - Recommended Profiles" description="Resumes that don't fir the job role" resumes = {lowRelevancy}></ResumeDisplay>      
    </div>
}