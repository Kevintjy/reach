const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
data = {}

  app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin','http://localhost:3000'); //当允许携带cookies此处的白名单不能写’*’
    res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
    res.header('Access-Control-Allow-Credentials',true);  //允许携带cookies
    next();
});

app.get('/data', (req, res) => {
    res.send(data)
})

app.get('/get_public_data', (req, res) => {
    var public_data = {alldata: []}
    for(i in data){
        if (data[i].type === 'public' && data[i].used === false){
            var temp = {}
            temp['id'] = parseInt(i)
            temp['wager'] = data[i].wager
            public_data.alldata.push(temp)
        }
    }
    res.send(public_data)

})

app.get('/get_data/:id', (req, res) => {
    const id = req.params.id
    data[id].used = true
    res.send({'data': data[id]}) 
   })

app.post('/add_data', (req, res) => {
    var id = 1000 + Math.ceil(Math.random() * 8999)
    while (id in data && data[id].used === false){
        id = 1000 + Math.ceil(Math.random() * 8999)
    }
    data[id] = {contract: req.body.contract.replace('\'\"', ''), type: req.body.type, wager: parseInt(req.body.wager.hex)/10e17, used: false}
    console.log(data)
    res.status(200).send({id: id})
})
const port = process.env.PORT || 5000
app.listen(port, () => {
 console.log(`Listening on port ${port}...`)
});

