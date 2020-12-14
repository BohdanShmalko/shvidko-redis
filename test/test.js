const {Shvidko, requestCreator} = require("shvidko"),
      {SvidkoRedisClient} = require("../index")

const redisPort = 50501 //optional parameter

const options = {
    sessions : {
        time : 20,
        client : SvidkoRedisClient(redisPort)
    }
}

const app = new Shvidko(options)
app.listen(3001, () => console.log('\x1b[32m%s\x1b[0m', 'start server'), "localhost")

const testSetSession = requestCreator("get", "/set/:key/:value", async (req, res) => {
    const {session} = req
    const {key, value} = req.params
    let data = await session.get()
    data[key] = value
    await session.set(data)
    res.send("set")
}, {useSessions : true})

const testGetSession = requestCreator("get", "/get", async (req, res) => {
    const {session} = req
    let data = await session.get()
    res.send(data)
}, {useSessions : true})

app.compose(testSetSession, testGetSession)
