import express from 'express'
import {userLogController} from '../controllers'

const router = express.Router();

router.post('/log', (req, res) => {
  userLogController.checkAndLog(req.headers.authorization, req.body.cvv, (err, responseObj) => {
    if (err) {
      res.status(400).json(err);
      return;
    }
    res.status(responseObj.statusCode).json(responseObj);
  })
});

module.exports = router;
