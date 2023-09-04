const redis = require('redis');
const redisClient = redis.createClient(6379);

app.get('/cache/user/:email', async (req, res) => {
  const email = req.params.email;

  try{
    redisClient.get(email, async (err, response) => {
      console.log(response);
      if(response) {
        console.log("User successfully retrieved from cache");
        res.status(200).send(JSON.parse(response));
      } else {
        const response = await axios.get(`${MOCK_API}?email=${email}`);
        const user = response.data;
        redisClient.setex(email, 600, JSON.stringify(user));
        console.log("User successfully retrieved from the API");
        res.status(200).send(user);
      }
    })
  }catch(err) {
    res.status(500).send({ error: err.message });
  }
})