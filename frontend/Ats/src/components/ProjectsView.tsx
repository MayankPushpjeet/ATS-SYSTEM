import { DetailView } from "./DetailView"

export function ProjectsView({resumeData})
{
    return <div class = "flex flex-col overflow-y-scroll">
        <DetailView title="Project-title:" value={resumeData.projects[0].project_title}></DetailView>
        <DetailView title="Description:" value={resumeData.projects[0].short_description}></DetailView>
        <DetailView title="Start:" value={resumeData.projects[0].time_duration.start}></DetailView>
        <DetailView title="End:" value={resumeData.projects[0].time_duration.end}></DetailView>
    </div>

}