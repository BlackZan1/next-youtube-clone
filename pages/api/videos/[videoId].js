import fetch from 'node-fetch';

export default async (req, res) => {
    const {
        query: { videoId }
    } = req;

    const data = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,player&key=AIzaSyBboofv6A-6XIzV0HQwjvm2T941jXg0f8Q&id=${videoId}`, 
    { 
        method: 'GET' 
    })

    const result = await data.json();

    res.statusCode = 200;
    res.json({ video: result });
}