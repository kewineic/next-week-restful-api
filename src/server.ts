import express from 'express';

const app = express();
app.use(express.json());

app.post('/users', (req, res) => {
    console.log(req.body)

    const test = [ {nome: "Diego"},{nome: "Diego"} ,{nome: "Diego"} ,{nome: "Diego"}  ]


    return res.json(test)
})

app.listen(8000); 