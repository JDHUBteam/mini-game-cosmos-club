'use strict'

const Card = use('App/Models/Card')
var shuffle = require('shuffle-array')

class CardController {
    async show({view, params}){
        const data = await Card.find(params.id)
        var questions = []
        questions = JSON.parse(data.content)
        shuffle(questions)
        return questions.slice(0, 49)
    }
}

module.exports = CardController
