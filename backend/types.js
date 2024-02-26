const zod = require('zod');

const jobParameters = zod.object({
    jobTitle : zod.string(),
    jobDescription : zod.string(),
})

module.exports = {
    jobParameters : jobParameters
}