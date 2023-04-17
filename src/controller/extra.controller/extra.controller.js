const axios = require("axios");
const jwt = require("jsonwebtoken");
const { mail } = require("../../utils/mail");
const booking = require("../../models/booking.model");
const { StatusCodes } = require("http-status-codes");
exports.zoomLink = async (req, res) => {
  const ZOOM_API_KEY = process.env.ZOOM_API_KEY;
  const ZOOM_API_SECRET = process.env.ZOOM_API_SECRET;
  const MEETING_TOPIC = "Meeting";
  const MEETING_PASSWORD = "123456";
  const email = req.body.email;
  try {
    const payload = {
      iss: ZOOM_API_KEY,
      exp: new Date().getTime() + 60 * 60 * 1000,
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
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    const meetingLink = response.data.join_url;
    if (meetingLink) {
      // find the booking by id and update
      const booking_ = await booking.findByIdAndUpdate(
        req.params.id,
        {
          meetingLink: meetingLink,
        },
        { new: true }
      );
      console.log(req.params, req.body);
      mail().sendMail({
        from: process.env.HOST,
        to: email,
        subject: "Appointment Meeting Link",
        html: ` 
        <p style="font-size:16px; font-weight:bolder">Dear ${booking_.username}</p>
        <p style="font-size:12px;">The meeling link is here ${meetingLink}</p>
        <p style="font-size:12px;">Hope you will be there on time.</p>
        <p style="font-size:12px;">Thank You</p>
         `,
      });
    }
    res.status(StatusCodes.CREATED).send({ data: meetingLink, success: true });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Error creating Zoom meeting" });
  }
};
