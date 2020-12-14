const redis = require('redis')

const SvidkoRedisClient = (port) => {
    const redisClient = redis.createClient()
    return {
        create : async (token, path) => {
            await redisClient.set(token, JSON.stringify({}), err => {
                if(err) throw err 
            })
        },

        set : async (token, newData, path) => {
            await redisClient.set(token, JSON.stringify(newData), err => {
                if(err) throw err 
            })
        },

        get : (token, path) => {
        return new Promise((resolve, reject) => {
            redisClient.get(token, (err, data) => {
                if(err) {
                    reject(err)
                    return
                }
                resolve(JSON.parse(data))
               })
          });
        },

        delete : async (token, path) => {
        await redisClient.del(token, err => {
            if(err) throw err
        })
        }
    }
}

module.exports = SvidkoRedisClient