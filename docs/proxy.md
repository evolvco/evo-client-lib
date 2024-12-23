### Proxy example using vite proxy
*/vite.config.js*
```
...
server:{
    ...,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        cookieDomainRewrite: {
          '*': 'localhost',
        },
        cookiePathRewrite: {
          '*': '/',
        },
      },
      '/ws':{
        target: 'ws://localhost:3030',
        ws: true,
        rewriteWsOrigin: true,
      }
    }
}
```