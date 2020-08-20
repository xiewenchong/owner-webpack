let express = require('express');
let app = express();
app.get('/api/user',(req,res)=>{
    res.json({
        name: '张三'
    })
})
app.listen(4000)