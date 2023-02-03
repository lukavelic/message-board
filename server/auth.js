const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    try {
    //   get the token from the authorization header

        // const token = await req.headers.cookie.split("=")[1];
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2RiY2MxZTQ4NmI3NzQ1Yzg5N2RhYWQiLCJ1c2VybmFtZSI6Imx1a2EiLCJpYXQiOjE2NzU0MjkxMjAsImV4cCI6MTY3NTUxNTUyMH0.Ywsk8KroatzhBIkcYb0Kw-TdVDgAlQutKNQCpXHl8EA'

        const token = await req.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
        const decodedToken = await jwt.verify(
            token,
            "RANDOM-TOKEN"
        );
        
    // retrieve the user details of the logged in user
        const user = await decodedToken;

    // pass the user down to the endpoints here
        req.user = user;

    // pass down functionality to the endpoint
        next();
    } catch (err) {
        res.status(401).json({ msg: 'You are not authorized', err})
    }
}