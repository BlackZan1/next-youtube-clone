export default async (req, res) => {
    const {
        query: { title }
    } = req;

    const data = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${title}&type=video&key=AIzaSyBboofv6A-6XIzV0HQwjvm2T941jXg0f8Q&maxResults=12`, 
    { 
        method: 'GET' 
    })

    const results = await data.json();

    res.statusCode = 200;
    res.json({ search: results });
}