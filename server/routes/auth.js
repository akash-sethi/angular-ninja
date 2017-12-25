import express from 'express'
import {authController} from '../controllers'

const router = express.Router();

router.post('/auth', (req, res) => {
    authController.auth(req.body.credentials, (err, user) => {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.json({user: user.toAuthJson()});
    })
});

router.post('/signup', (req, res) => {
    authController.signup(req.body.credentials, (err, user) => {
        if (err) {
            return res.status(400).json({errors: err});
        }
        res.json({user: user.toAuthJson()})
    })
});

module.exports = router;
