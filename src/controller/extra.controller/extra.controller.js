const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.zoomLink = async (req, res) => {
    const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
    const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;
    const MEETING_TOPIC = 'Meeting';
    const MEETING_PASSWORD = '123456';
    try {
        const payload = {
            iss: ZOOM_API_KEY,
            exp: new Date().getTime() + 60 * 60 * 1000 // Token expires in 1 hour
        };
        const token = jwt.sign(payload, ZOOM_API_SECRET);
        const response = await axios.post(
            `https://api.zoom.us/v2/users/me/meetings`,
            {
                topic: MEETING_TOPIC,
                type: 2,
                password: MEETING_PASSWORD,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true,
            }
        );

        const meetingLink = response.data.join_url;
        res.json({ meetingLink });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating Zoom meeting' });
    }
};

