import performace from './performace'
import security from './security'
import devtools from './devtool'

const isDev = process.env.NODE_ENV === 'development'

export default app => {
    if (isDev) devtools(app)

    security(app)
    performace(app)

}
