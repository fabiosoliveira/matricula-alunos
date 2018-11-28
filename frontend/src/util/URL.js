let ip = 'localhost'
let port = '3003'

if (process.env.NODE_ENV == "production") {
    ip = '192.168.44.101'
}


export default `http://${ip}:${port}`