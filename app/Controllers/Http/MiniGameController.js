'use strict'

const Card = use('App/Models/Card')

class MiniGameController {
    async index({view}){
        const cards = await Card.all();
        return view.render('mini-game.index', {
            title: 'Mini Game',
            cards: cards.toJSON()
        })
    }
}

module.exports = MiniGameController
