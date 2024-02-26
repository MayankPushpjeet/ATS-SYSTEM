const multer = require('multer')
const express = require('express');
const {upload} = require('./multerConfig');
const cors = require('cors');
const { jobParameters } = require('./types.js');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const { analyzeResume } = require('./openaiService');

require('dotenv').config();

const app = express();

app.use(cors());
const PORT = 3000;

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

let uploadedFiles = [];

async function extractTextFromPDF(pdfFilePath) {
    // Dynamically import pdfjs-dist as an ES module
    const pdfjsLib = await import('pdfjs-dist/build/pdf.mjs');

    return new Promise((resolve, reject) => {
        // Read the PDF file
        const fileData = new Uint8Array(fs.readFileSync(pdfFilePath));

        // Load PDF file
        pdfjsLib.getDocument({ data: fileData }).promise.then(function (pdf) {
            let plainText = '';

            // Iterate through each page
            const getPageText = function (pageNumber) {
                return pdf.getPage(pageNumber).then(function (page) {
                    // Extract text content from the page
                    return page.getTextContent();
                }).then(function (textContent) {
                    // Concatenate text content from all pages
                    textContent.items.forEach(function (item) {
                        plainText += item.str + ' ';
                    });

                    // Move to the next page if exists
                    if (pageNumber < pdf.numPages) {
                        return getPageText(pageNumber + 1);
                    } else {
                        // Resolve with the extracted plain text
                        resolve(plainText);
                    }
                });
            };

            // Start extracting text from the first page
            getPageText(1);
        }).catch(function (error) {
            reject(error);
        });
    });
}

async function processPDFs(jobTitle, jobDescription, apiKey) {
    const results = [];
    for (const filePath of uploadedFiles) {
        try {
            let resumeText = "";
            extractTextFromPDF(filePath)
                .then(plainText => {
                    console.log(plainText);
                    resumeText = plainText;
                })
                .catch(error => {
                    console.error('Error extracting text from PDF:', error);
            });
            console.log(resumeText);
            const analyzedData = await analyzeResume(jobTitle, jobDescription, resumeText, apiKey);
            results.push(analyzedData);
        } catch (error) {
            console.error('Error processing PDF:', error);
        }
    }
    return results;
}

app.post('/upload', upload.array('pdf'), async(req, res, next) => {
    console.log("File Recieved")
    const files = req.files; 
    const paths = files.map(file => file.path);
    uploadedFiles.push(...paths);
    const { jobTitle, jobDescription } = req.body;
    try {
        const apiKey = process.env.OPENAI_API_KEY;
        const analyzedResults = await processPDFs(jobTitle, jobDescription, apiKey);
        console.log(analyzedResults);
        res.json(analyzedResults);
    } catch (error) {
        console.error('Error processing resumes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(400).send(err.message);
    } else {
        res.status(500).send('Something went wrong');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
