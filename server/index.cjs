const express = require('express')
const cors = require('cors')
const yelp = require('api')('@yelp-developers/v1.0#8e0h2zlqcimwm0')
const process = require('process')

const app = express()
app.use(cors())

yelp.auth(`Bearer ${process.env.YELP_API_KEY}`)
app.get('/yelpSearch', async (req, res) => {
  try {
    const { data, status } = await yelp.v3_business_search(req.query)
    res.status(status)
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(error.status)
    res.send(error.data)
  }
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
