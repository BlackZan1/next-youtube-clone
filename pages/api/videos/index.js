// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch';

export default async (req, res) => {
  const data = await fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&maxResults=25&key=AIzaSyBboofv6A-6XIzV0HQwjvm2T941jXg0f8Q&chart=mostPopular', 
  { 
    method: 'GET' 
  })

  const results = await data.json();

  res.statusCode = 200;
  res.json({ videos: results.items });
}