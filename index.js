const express = require('express');
const app = express();
app.use(express.json());


app.listen(8080, () => {
    console.log("Server ativo")
})


let listas = [
    {
        id: 1, 
        title: 'Tarefa 1', 
        description: 'Criação de Api', 
        completed:'Tarefa realizada'
    },

    {
        id: 2, 
        title: 'Tarefa 2', 
        description: 'SPRINT 1', 
        completed:'Tarefa não realizada'
    },

    {
        id: 3, 
        title: 'Tarefa 3', 
        description: 'Trabalhando com rotas', 
        completed:'Tarefa realizada'
    },
];


// Inciando os metodos do CRUD
//--------------------------------------------------------------------------------------------------------
//Metodo Get

app.get('/tarefas', (req, res) => {
    res.send(listas);
});

//Utilizando o id para puxarmos uma tarefa com o metodo GET/tarefas/:id
app.get('/tarefas/:id', (req, res) => {
    const tarefa = listas.find(t => t.id === parseInt(req.params.id));
    
    if(!tarefa) return res.status(404).send('ERRO: ID não encontrado, por favor verificar e tentar novamente!');
    res.send(tarefa);
});

//Metodo POST
app.post('/tarefas', (req, res) => {
    if (!req.body.title)
        return res.status(404).send('ERRO: A tarefa precisa de um Titulo.');

    tarefa = {
        id: listas.length + 1, 
        title: req.body.title, 
        description: req.body.description,
        completed: req.body.completed || "Tarefa não realizada" 
    };

    listas.push(tarefa);
    res.send(tarefa);
});

//Metodo Put 
app.put('/tarefas/:id', (req, res) => {
    const {id} = req.params;
    let verificId = listas.findIndex((listas) => listas.id == id);
    if(verificId < 0){
        return res.status(404).send('ERRO: TAREFA NÃO PODE SER ATUALIZADA POIS O ID É INVALIDO .');
    }
    else{
        const {title, description, completed} = req.body;
        listas[verificId] = {...listas[verificId], 
        title: title || listas[verificId].title,
        description: description || listas[verificId].description,
        completed: completed || listas[verificId].completed
        } 
    }
    res.send("Tarefa atualizada com sucesso")
});