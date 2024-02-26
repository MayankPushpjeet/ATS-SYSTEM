import { useState } from 'react';
import './App.css';
import { Topbar } from './components/Topbar';
import { Pdfuploader } from './components/Pdfuploader';
import { JobCard } from './components/JobCard';
import { ResultView } from './components/ResultView';
import { ResumeArrayInterface } from './interfaces';

function App() {
  const dummyData = {
    relevancy_score: Math.floor(Math.random() * 101), // Random relevancy score between 0 and 100
    personal_details: {
        name: "John Doe",
        email: "john.doe@example.com"
    },
    projects: [
        {
            project_title: "Dummy Project",
            short_description: "This is a dummy project",
            technologies_used: ["Dummy Technology"],
            time_duration: {
                start: "2023-01-01",
                end: "2023-12-31",
                duration: 12 // in months
            },
            relevancy: Math.floor(Math.random() * 6) // Random relevancy score between 0 and 5
        }
    ],
    college: {
      name: "Dummy College",
      branch: "Dummy Branch",
      degree: "Dummy Degree",
      cgpa: 3.5,
      time_duration: {
          start: "2016-01-01",
          end: "2020-01-01"
      }
    },
    professional_experiences: [
        {
            role: "Dummy Role",
            organization: "Dummy Organization",
            short_description: "This is a dummy role",
            technologies_used: ["Dummy Technology"],
            time_duration: {
                start: "2020-01-01",
                end: "2021-01-01",
                duration: 12 // in months
            },
        }
    ]
// };
  };
  
  const [files, setFiles] = useState<File[]>([]);
  const [mainViewOpacity, setMainViewOpacity] = useState(1);
  const [jobCardVisibility, setJobCardVisibility] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [highRelevancy, setHighRelevancy] = useState([dummyData]);
  const [lowRelevancy, setLowRelevancy] = useState([dummyData]);
  const [toggleResultView, setToggleResultView] = useState(false);
 

  async function handleFileUpload(): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('jobTitle', jobTitle);
      formData.append('jobDescription', jobDescription);
      files.forEach((file, index) => {
        formData.append('pdf', file);
      });

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const data = await response.json();
      const temp:ResumeArrayInterface = [];
      const tempHigh:ResumeArrayInterface = [];
      const tempLow:ResumeArrayInterface = [];
      console.log(data);
      data.forEach((result: any) => {
        if (result.relevancy_score >= 50) {
            tempHigh.push(result);
        } else {
            tempLow.push(result);
        }
      });
      setHighRelevancy(tempHigh);
      setLowRelevancy(tempLow);
      setToggleResultView(true);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div style={{ opacity: mainViewOpacity }}>
        <Topbar />
        {toggleResultView ? (
            <ResultView highRelevancy={highRelevancy} lowRelevancy={lowRelevancy}/>
            ) : (
                <Pdfuploader 
                    setJobCardVisibility={setJobCardVisibility} 
                    setFiles={setFiles} 
                    files={files} 
                    setMainViewOpacity={setMainViewOpacity}
                />
        )}
      </div>
      <JobCard
        visible={jobCardVisibility}
        setJobCardVisibility={setJobCardVisibility}
        setMainViewOpacity={setMainViewOpacity}
        handleFileUpload={handleFileUpload}
        setJobTitle={setJobTitle}
        setJobDescription={setJobDescription}
        setFiles={setFiles}
        setToggleResultView={setToggleResultView}
      />
    </div>
  );
}

export default App;
