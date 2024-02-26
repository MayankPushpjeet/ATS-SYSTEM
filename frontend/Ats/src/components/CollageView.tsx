import { DetailView } from "./DetailView"

export function CollageView({resumeData})
{
    return <div class = "flex flex-col overflow-y-scroll">
        <DetailView title="Name:" value={resumeData.college.name}></DetailView>
        <DetailView title="Branch:" value={resumeData.college.branch}></DetailView>
        <DetailView title="Degree:" value={resumeData.college.degree}></DetailView>
        <DetailView title="CGPA:" value={resumeData.college.cgpa}></DetailView>
        <DetailView title="Start:" value={resumeData.college.start}></DetailView>
        <DetailView title="End:" value={resumeData.college.end}></DetailView> 
    </div>
}