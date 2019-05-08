'use strict'

const Card = use('App/Models/Card')
var shuffle = require('shuffle-array')

class CardController {
    async getQuestion({ params }) {
        const data = await Card.find(params.id)
        var questions = []
        questions = JSON.parse(data.content)
        shuffle(questions)
        return questions.slice(0, 50)
    }

    async show({ auth, view, params, response }) {
        try{
            await auth.check()
            const result = await Card.find(params.id)
            var description = result.description
            return view.render('minigame.cards.index', {
                session_id: params.id,
                description: description
            })
        } catch(e){
            response.route('login_path')
        }
    }
}

module.exports = CardController
