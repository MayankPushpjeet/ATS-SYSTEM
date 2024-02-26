interface TimeDuration {
    start: string;
    end: string;
    duration: number;
  }
  
  interface PersonalDetails {
    name: string;
    email: string;
  }
  
  interface Project {
    project_title: string;
    short_description: string;
    technologies_used: string[];
    time_duration: TimeDuration;
    relevancy: number;
  }

  interface College {
    name: string;
    branch: string;
    degree: string;
    cgpa: number;
    time_duration:{
      start : string;
      end : string;
    };
  }
  
  interface ProfessionalExperience {
    role: string;
    organization: string;
    short_description: string;
    technologies_used: string[];
    time_duration: TimeDuration;
  }
  
  export interface ResumeInterface {
    relevancy_score: number;
    personal_details: PersonalDetails;
    projects: Project[];
    professional_experiences: ProfessionalExperience[];
    college : College;
  }

  export interface ResumeArrayInterface extends Array<ResumeInterface> {}