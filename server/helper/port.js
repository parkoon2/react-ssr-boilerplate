import confing from '../config/config'
const DEFAULT_PORT = confing.port
export const SERVER_PORT = normalizePort(process.env.PORT || DEFAULT_PORT)

function normalizePort(val) {
    let port = parseInt(val, 10)

    if (port < 0) return

    if (isNaN(port)) {
        return val
    }
    return port
}