'use strict'

const Card = use('App/Models/Card')

class CardController {
    async show({view, params}){
        let data = JSON.parse(Card.find(params.id))
    }
}

module.exports = CardController
