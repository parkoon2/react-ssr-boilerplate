import os from 'os'
import config from '../config/config.js'

const isDev = process.env.NODE_ENV === 'development'

let useCluster = false
if (config.cluster === 'auto' && !isDev) {
    useCluster = os.cpus().length
} else if (config.cluster === true) {
    useCluster = os.cpus().length
} else if (typeof config.cluster === 'number' && config.cluster > 0) {
    useCluster = Math.trunc(config.cluster);
}

export default useCluster