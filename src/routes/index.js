const express = require('express')
const router = new express.Router()


//npm install 

//ponto de acesso de get
//retornar statys de 200 ok 
router.get('/', (req, res, next)=> {
    res.status(200).send({
        "nome" : "Guilherme Lima"
    })
})
router.get('/privada', (req, res)=> {
    const token = req.headers['authorization'];

    if(!token || token !== 'minhaSenha'){
        return res.status(401).send('Sem autorizacao!')
    }
    res.send('Area acessada com sucesso!').status(200)
})

const tokenExemplos = {
    'tokenAdmin' : {role: 'admin'},
    'tokenUser' : {role: 'user'},
    'TokenConvidado' : {role: 'convidado'}
}

router.get('/admin', (req, res) => {
    const token = req.headers["authorization"]

    if(!token){
        return res.status(401).send('Sem autorizacao')
    }
    const user = tokenExemplos[token]
    if(!user){
        return res.status(401).send('Token invalido')
    }
    if(user.role != 'admin'){
        return res.status(403).send('Você nao tem permissao para acessar aqui')
    }

    return res.send('Acesso liberado!').status(200)
})

// exemplo bad request - 400
router.post('/submit', (req, res) => {
    const {nome, email} = req.body;

    if(!nome || !email){
        return res.status(400).send('Bad request, nome e email sao obrigatorios')
    }

    //status 202 created
    res.send('Dado criado com sucesso!').status(202);
})

let items = [
    {id: 1, nome: 'item1'},
    {id: 2, nome: 'item1'},
    {id: 3, nome: 'item1'},
]
router.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const item = items.find(item => item.id == id)

    if(item){
        res.status(200).send(item)
    }else {
        res.status(404).send('Item nao encontrado')
    }
})
module.exports = router;