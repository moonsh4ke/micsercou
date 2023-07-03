import express from 'express';

const router = express.Router();

router.get('/currentuser', (req, res) => {
    res.send("hello world")
    console.log("test");
})

export { router as currentUserRouter }
