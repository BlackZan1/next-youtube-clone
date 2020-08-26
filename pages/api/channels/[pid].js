import fetch from 'node-fetch';

export default async (req, res) => {
    const {
        query: { pid }
    } = req;

    const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${pid}&key=AIzaSyBboofv6A-6XIzV0HQwjvm2T941jXg0f8Q`, 
    { 
      method: 'GET' 
    })

    const result = await data.json();

    res.statusCode = 200;
    res.json({ channel: result });
}