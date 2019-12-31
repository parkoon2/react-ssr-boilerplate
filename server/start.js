
import cluster from 'cluster'
import { SERVER_PORT } from './helper/port'
import useCluster from './helper/cluster'
import server from './server'

if (useCluster) {
    if (cluster.isMaster) {
        console.log(`Running cluster's master. Number of CPUs: ${useCluster}`);
        forkWorkers(useCluster)
    } else {
        startWorker()
    }
} else {
    console.log('Running without cluster.')
    startWorker()
}

function startWorker() {
    server.listen(SERVER_PORT)
}

function forkWorkers(numberOfCpus) {
    for (let i = 0; i < numberOfCpus; i++) {
        const worker = cluster.fork()
        console.log(`Forked new worker: ${worker.id}`)

        worker.on('exit', (code, signal) => {
            if (signal) {
                console.error(`Worker was killed by signal: ${signal}`)
            } else if (code !== 0) {
                console.error(`Worker exited with error code: ${code}`)
            } else {
                console.log('Worker success!')
            }
        });
    }
}


