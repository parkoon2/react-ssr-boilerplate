import http from 'http'
import express from 'express'
import path from 'path'
import fs from 'fs'


import { SERVER_PORT as PORT } from './helper/port'
import middlewareConfigure from './middleware'

import { handleServerError, handleListening, handle404Error } from './helper/exception'

const app = express()
const server = http.createServer(app)
const isDev = process.env.NODE_ENV === 'development'

middlewareConfigure(app)

app.all('/api/v1/*', (req, res) => {
    const users = [
        {
            name: 'p',
            age: 7
        },
        {
            name: 'j',
            age: 8
        },
    ]
    res.status(200).json({ message: 'success', users })
})

if (!isDev) {
    app.use(express.static(path.join(__dirname, '../public')));
    app.get('*', (req, res) => {
        const html = fs.readFileSync(path.join(__dirname, 'public/index.html')).toString()
        res.send(html)
    })
}


// const HTML = (req, context) => {
//     const application = renderToString(
//         <Provider store={store}>
//             <StaticRouter location={req.url} context={context}>
//                 <App />
//             </StaticRouter>
//         </Provider>
//     );
//     const htmlData = fs.readFileSync('./client/public/index.html').toString()
//     const finalHtml = htmlData
//         .replace('<!--application-->', application)
//         .replace('// <!--initialState-->', `window.__APP_INITIAL_STATE__ = ${111};`)
//     return finalHtml
// };


// const context = {};

// Routes.forEach(route => {
//     app.get(route.url, (req, res) => {
//         return res.send(HTML(req, context));
//     });
// });

server.on('listening', handleListening.bind(this, PORT))
server.on('error', handleServerError)

export default server