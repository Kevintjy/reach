const express = require('express')
const app = express();
var cors = require('cors');
const bodyParser = require('body-parser');
const { param } = require('./back_end/auth-route');
app.use(bodyParser.json());
data = {1: {contract: 'abcdcasdas', type: 'private'}}

  app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin','http://localhost:3000'); //当允许携带cookies此处的白名单不能写’*’
    res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
    res.header('Access-Control-Allow-Credentials',true);  //允许携带cookies
    next();
});

app.get('/get_data/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
    if (data[id]){
        res.status(200).send({'data': data[id]})
    }else{
        res.status(404).send({'data': 'not found'})
    }
   })
const port = process.env.PORT || 5000
app.listen(port, () => {
 console.log(`Listening on port ${port}...`)
});
