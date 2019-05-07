'use strict'

const Card = use('App/Models/Card')

class CardController {
    async show({view, params}){
        return Card.find(params.id)
    }
}

module.exports = CardController
