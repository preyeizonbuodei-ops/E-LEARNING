
const axios = require('axios')

exports.ConnectNews = async (req, res) => {
    
    const newsApiKey = process.env.NEWS_API_KEY
    const newsApiKeyUrl = process.env.NEWS_API_URL
    try {
        
        const connect = await axios.get(newsApiKeyUrl, {
            params: {
                q: "engineering",
                apiKey: newsApiKey
            }

        });

        return res.status(200).json({ success: true, data: connect.data })

    } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Error data:", error.response?.data);
        console.log("Error message:", error.message);
        console.log(error)
    }
}