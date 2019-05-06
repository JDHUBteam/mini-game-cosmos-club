'use strict'

class CardController {
    async show({view}){
        return view.render('minigame.cards.index');
    }
}

module.exports = CardController
