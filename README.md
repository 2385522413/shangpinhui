# app

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 路由传参问题
```路由传参，参数有几种写法?
params参数:属于路径当中的一部分，需要注意，在配置路由的时候，需要占位,不占位，刷新后会丢失数据  
 携带的参数是路径的一部分，必须传，如果不传， 需要在 路由地址占位符后 加一个 ？  ,如果传空串，会导致路径出现问题 解决：params:{key:'' || undefind} 

query参数:不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&kv=,不需要占位
```
