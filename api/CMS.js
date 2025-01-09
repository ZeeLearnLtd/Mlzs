const express = require('express');
const da = require('../data-access');
const { json } = require('stream/consumers');
const router = express.Router();



router.post('/Getseo', async (req, res) => {
  try {
    const cmd = "usp_getpagedata";
    const result = await da.executeEntity(cmd, req.body, req.headers["dbid"]);
    //const c = await da.close();

    res.json({
      success: 200,
      data: JSON.parse(Object.values(result.recordset[0])[0]),
    });
  }
  catch (error) {
    const c = await da.close();
    console.log(error)
    res.status(500).json(error);
  }

});
router.post("/Getblogdata", async (req, res) => {
  try {
    const cmd = "usp_getblogdata";
    const result = await da.executeEntity(cmd, req.body, req.headers["dbid"]);
    //const c = await da.close();

    res.json({
      success: 200,
      data: JSON.parse(Object.values(result.recordset[0])[0]),
    });
  } catch (error) {
    const c = await da.close();
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
