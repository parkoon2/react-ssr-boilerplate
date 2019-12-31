import compression from 'compression'
import expressStatusMonitor from 'express-status-monitor'

export default app => {
    app.use(compression())
    app.use(expressStatusMonitor())
}