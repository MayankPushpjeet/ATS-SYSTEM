import { DetailView } from "./DetailView"

export function ProfessionalExperienceView({resumeData})
{
    return <div class = "flex flex-col overflow-y-scroll">
        <DetailView title="Role:" value={resumeData.professional_experiences[0].role}></DetailView>
        <DetailView title="Organization:" value={resumeData.professional_experiences[0].organization}></DetailView>
        <DetailView title="Description:" value={resumeData.professional_experiences[0].short_description}></DetailView>
        <DetailView title="Start:" value={resumeData.professional_experiences[0].time_duration.start}></DetailView>
        <DetailView title="End:" value={resumeData.professional_experiences[0].time_duration.end}></DetailView>
        <DetailView title="Duration:" value={resumeData.professional_experiences[0].time_duration.duration}></DetailView>
    </div>
}