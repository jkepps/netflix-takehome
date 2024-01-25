const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const yelp = require('api')('@yelp-developers/v1.0#8e0h2zlqcimwm0')
const process = require('process')

yelp.auth(`Bearer ${process.env.YELP_API_KEY}`)
app.use(cors()).get('/search', async (req, res) => {
  try {
    const { data, status } = await yelp.v3_business_search(req.query)
    res.status(status)
    res.send(data)
  } catch (error) {
    res.statusCode = error.status
    res.send(error.data)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
