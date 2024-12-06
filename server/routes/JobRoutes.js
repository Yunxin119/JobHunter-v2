import express from 'express';
import axios from 'axios';

const router = express.Router();

let jobCache = {};

router.get('/search', async (req, res) => {
    const { query, location } = req.query;
    const appId = process.env.ADZUNA_APP_ID;
    const apiKey = process.env.ADZUNA_API_KEY;

    try {
        const response = await axios.get(
            `https://api.adzuna.com/v1/api/jobs/us/search/1`,
            {
                params: {
                    app_id: appId,
                    app_key: apiKey,
                    what: query,       // Job title or keyword
                    where: location,   // Location
                },
            }
        );
        const jobs = response.data.results;
        jobs.forEach((job) => {
            jobCache[job.id] = job; // 缓存职位数据
        });
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs from Adzuna:', error.message);
        res.status(500).json({ error: 'Failed to fetch job data' });
    }
});

router.get('/details/:id', (req, res) => {
    const { id } = req.params;

    const job = jobCache[id]; // 从缓存中查找职位
    if (job) {
        return res.json(job); // 返回职位详情
    } else {
        return res.status(404).json({ error: "Job not found" }); // 如果职位不在缓存中
    }
});

export default router;
