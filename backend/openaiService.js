// openaiService.js
const OpenAI =  require("openai");

const openai = new OpenAI();

async function analyzeResume(jobTitle, jobDescription, resumeText, apiKey) {
    try {
        const prompt = `Please analyze the relevancy score of the resume : ${resumeText} with respect to the given jobTitle : ${jobTitle} and jobDescription : ${jobDescription} on a scale of 0-100 where 0 means totally irrelevant and 100 means most relevant. Additionally, extract the following details from the resume (if a detail is not found assign it empty-string or '0' if it's a number) and return them in a JSON format:

        - relevancy_score
        - personal_details
            - name
            - email
        - projects
            - project_title
            - short_description
            - technologies_used
            - time_duration
                - start
                - end
                - duration (in months)
            - relevancy
        - professional_experiences
            - role
            - organization
            - short_description
            - technologies_used
            - time_duration
                - start
                - end
                - duration (in months)        
        - college
            - name
            - branch
            - degree
            - cgpa
            - time_duration
                - start
                - end`
        ;
        
        const response = await openai.chat.completions.create({
            model : "gpt-3.5-turbo-0125",
            response_format : { "type": "json_object" },
            messages : [
                { role: 'user', content: prompt }
            ]
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            }
        });
        console.log(response.choices[0].message.content);
        if (!response || !response.choices || response.choices.length === 0) {
            throw new Error('Invalid response from OpenAI API');
        }
        
        const generatedText = response.choices[0].message.content.trim();
        const parsedData = JSON.parse(generatedText);
        return parsedData;

    } catch (error) {
        console.error('Error analyzing resume:', error);
        // If there's an error with OpenAI API, assign dummy data
        return {
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
                    college: {
                        name: "Dummy College",
                        branch: "Dummy Branch",
                        degree: "Dummy Degree",
                        cgpa: 3.5,
                        time_duration: {
                            start: "2016-01-01",
                            end: "2020-01-01"
                        }
                    }
                }
            ]
        };
    }
}



module.exports = {
    analyzeResume
};