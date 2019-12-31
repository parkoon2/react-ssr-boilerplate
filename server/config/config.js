export default {
    cors: {
        whitelist: [
            "http://localhost:5500"
        ]
    },
    cluster: "auto",
    port: process.env.NODE_ENV === 'development' ? 3000 : 80,
    host: 'http://localhost',
    devServer: {
        port: 5500
    },
}