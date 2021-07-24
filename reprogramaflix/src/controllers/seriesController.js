const series = require("../models/series.json")


const home = (request, response) => {
    response.status(200).send(
        {
            "message": "Olá, pessoal, bem-vindos ao {reprograma}flixx!!"
        }
    )
}

const getAll = (request, response) => {
    response.status(200).send(series)
}

const getById = (request, response) => {
    const requestedId = request.params.id

    const filteredId = series.find(serie => serie.id == requestedId)

    response.status(200).send(filteredId)
}

const getByTitle = (request, response) => {
    const requestedTitle = request.query.title.toLowerCase()

    const filteredTitle = series.find(serie => serie.title.toLowerCase().includes(requestedTitle))
    
        if(requestedTitle === "" || filteredTitle === undefined) {
            response.status(404).send(
                {
                "message": "Insira um título válido"
                })
        } else {
        response.status(200).send(filteredTitle)
        }
}

const getByGenre = (request, response) =>{
    const requestedGenre = request.query.genre.toLowerCase();
    const filteredGenre = series.filter(serie => {
      const filtro =  serie.genre.find(genero => genero.toLowerCase().includes(requestedGenre))

      if(filtro != null){
          return serie
      }
    });
    if (filteredGenre.length == 0){
        response.status(404).send({"message": "Busca não encontrada. Insira um gênero válido."})
    }else{
        response.status(200).send(filteredGenre);
    }

}

const createSerie = (req, res) => {
    let requisitedTitle = req.body.titulo
    let requisitedSeasons = req.body.seasons
    let requisitedGenre = req.body.genero

    const newSerie = {
        id: Math.random().toString(32).substr(2, 6),
        dataCriacao: new Date(),
        titulo: requisitedTitle,
        seasons: requisitedSeasons,
        genero: requisitedGenre
    }
    series.push(newSerie)
    res.status(201).send({
        "message": "Série criada com sucesso",
        newSerie
    })
};

const deleteSerie = (req, res) => {
    let idToDeleteSerie = req.params.id
    let idFilteredSerie = series.find(serie => serie.id == idToDeleteSerie)
    let  index = series.indexOf(idFilteredSerie)
    series.splice(index, 1)

    res.status(200).send(
        [
            {
                "message": "Série deletada com sucesso"
            },
            series
        ]
    )
};

// substituir todo o item da lista do json
const replaceSerie = (req, res) => {
    // acessar os dados da requisição
        let requisitedId = req.params.id
        let filteredId = series.find(serie => serie.id == requisitedId);
        let serieFromBody = req.body;
    
        const updatedSerie = {
            "id": filteredId.id,
            "data": filteredId.dataCriacao,
            "titulo": serieFromBody.titulo,
            "seasons": serieFromBody.seasons,
            "genero": serieFromBody.genero
        }
    
    // substituir o item
        const indice = series.indexOf(filteredId)
        series.splice(indice, 1, updatedSerie)
    
    
    
    
    // enviar resposta
    res.status(200).send({
        "message": "Série atualizada com sucesso",
        updatedSerie
    })
    
};

const updateTitle = (req, res) => {
    // pegar os dados da requisição
    let requisitedId = req.params.id 
    let newTitle = req.body.titulo

    // achar o item da lista que tem o mesmo id
    let filteredId = series.find(serie => serie.id == requisitedId)

    // o titulo da série filtrado seja igual ao titulo que vem da requisição
    filteredId.titulo = newTitle

    res.status(200).send({
        "message": "Titulo atualizado com sucesso",
        filteredId
    })

}





module.exports = {home, getAll, getById, getByTitle, getByGenre, createSerie, deleteSerie, replaceSerie, updateTitle}