'use strict'

const Card = use('App/Models/Card')
var shuffle = require('shuffle-array')

class CardController {
    async getQuestion({params}){
        const data = await Card.find(params.id)
        var questions = []
        questions = JSON.parse(data.content)
        shuffle(questions)
        return questions.slice(0, 50)
    }

    async show({view, params}){
        const result = await Card.find(params.id)
        var description = result.description
        console.log(description)
        return view.render('minigame.cards.index', {
            session_id: params.id,
            description: description
        })
    }
}

module.exports = CardController
