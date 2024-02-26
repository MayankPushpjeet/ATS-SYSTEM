import { AnalysedResumeView } from "./AnalysedResumeView"

export function ResumeDisplay({title, description, resumes})
{
    return <div class = "flex flex-row pt-5 px-10 pb-2 w-screen">
        <div class = "flex flex-col w-1/3">
                <div class = "text-xl text-slate-800 font-bold h-fit">{title}</div>
                <div class = "text-sm text-gray-400 mt-1 h-fit">{description}</div>
        </div>
        <div className = "flex flex-col  w-2/3 overflow-y-scroll">
            <div className = "flex justify-between rounded-md border-b-stone-50 border-1 bg-gray-50 h-8 items-center px-6">
                <div className = "text-slate-600 text-left" style = {{width : '25%'}} >Name</div>
                <div className = "text-slate-600 text-left" style = {{width : '25%'}}>Relevancy Score</div>
                <div className = "text-slate-600 text-left" style = {{width : '25%'}}>Resume Link</div>
            </div>
            {resumes.length ? (<div class="h-56">
                    {resumes.map((resume) => (
                        <AnalysedResumeView resumeData={resume}/>
                    ))}
                </div>):null
            }
        </div>
        
    </div>
}