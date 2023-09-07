const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const bodyparser = require('body-parser')

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views',path.join(__dirname,'/views'))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

let tarefas = []

app.get('/',(req,res)=>{
	res.render('index', {tarefasList:tarefas})
})

app.post('/',(req,res)=>{
	tarefas.push(req.body.tarefa)
	res.render('index', {tarefasList:tarefas})
})

app.get('/deletar/:id', (req, res)=>{
	tarefas = tarefas.filter((val,index)=>{
		if(index != req.params.id){
			return val;
		}
	})

	res.redirect('/')
})

app.listen(port,()=>{
	console.log('rodando')
})

//parei na aula "criando rotas básicas e preparando arquivos modulo projeto estático"
