const postsJson = require("../models/posts.json");
const { post } = require("../routes/postRoutes");


const getAll = (req, res) => {
    res.status(200).send(postsJson);
};

const getById = (req, res) => {
    const requisitedId = req.params.id 
    const filteredId = postsJson.find(post => post.id == requisitedId);
    res.status(200).send(filteredId)

};

const createPost = (req, res) => {
    let requisitedTitle = req.body.titulo
    let requisitedContent = req.body.conteudo
    let requisitedLabels = req.body.etiquetas 

    const newPost = {
        id: Math.random().toString(32).substr(2, 6),
        dataCriacao: new Date(),
        titulo: requisitedTitle,
        conteudo: requisitedContent,
        etiquetas: requisitedLabels
    }
    postsJson.push(newPost)
    res.status(201).send({
        "message": "Post criado com sucesso",
        newPost
    })
};

const deletePost = (req, res) => {
    let idToDeletePost = req.params.id
    let idFilteredPost = postsJson.find(post => post.id == idToDeletePost)
    let  index = postsJson.indexOf(idFilteredPost)
    postsJson.splice(index, 1)

    res.status(200).send(
        [
            {
                "message": "Post deletado com sucesso"
            },
            postsJson
        ]
    )
}

// substituir todo o item da lista do json
const replacePost = (req, res) => {
// acessar os dados da requisição
    let requisitedId = req.params.id
    let filteredId = postsJson.find(post => post.id == requisitedId);
    let postFromBody = req.body;

    const updatedPost = {
        "id": filteredId.id,
        "data": filteredId.dataCriacao,
        "titulo": postFromBody.titulo,
        "conteudo": postFromBody.conteudo,
        "etiqueta": postFromBody.etiquetas
    }

// substituir o item
    const indice = postsJson.indexOf(filteredId)
    postsJson.splice(indice, 1, updatedPost)




// enviar resposta
res.status(200).send({
    "message": "Post atualizado com sucesso",
    updatedPost
})

}

const updateTitle = (req, res) => {
    // pegar os dados da requisição
    let requisitedId = req.params.id 
    let newTitle = req.body.titulo 

    // achar o item da lista que tem o mesmo id
    let filteredId = postsJson.find(post => post.id == requisitedId)

    // o titulo do post filtrando seja igual ao titulo que vem da requisição
    filteredId.titulo = newTitle

    res.status(200).send({
        "message": "Titulo atualizado com sucesso",
        filteredId
    })

}


module.exports = {
    getAll,
    getById,
    createPost,
    deletePost,
    replacePost,
    updateTitle,
}