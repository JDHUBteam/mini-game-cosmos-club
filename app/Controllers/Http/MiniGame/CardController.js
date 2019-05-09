'use strict'

const Card = use('App/Models/Card')
const User = use('App/Models/User')
const BoardRank = use('App/Models/Boardrank')
var shuffle = require('shuffle-array')

class CardController {
    async rank({view, params, request, response }) {
        const {user_id, point}  = request.all();
        const session_id = params.id
        await BoardRank.findOrCreate(
            {session_id: parseInt(session_id), user_id: parseInt(user_id), point: parseInt(point)}
        )
    }

    async board({view, params, request, response}){
        const results = await BoardRank.findBy('session_id', parseInt(params.id))
        var boards = []

        for(var e in results){
            console.log(e)
            var id = e.user_id
            var _user = await User.find(1)
            var name2 = _user.name
            var width = e.point /250;
            boards.push({name: name2, session_id: e.session_id, width: width})
        }
        
        return view.render('minigame.rank', {
            title: 'Rank',
            boards: boards
        })
    }

    async getQuestion({ params }) {
        const data = await Card.find(params.id)
        var questions = []
        questions = JSON.parse(data.content)
        shuffle(questions)
        return questions.slice(0, 50)
    }

    async show({ auth, view, params, response }) {
        try {
            await auth.check()
            const result = await Card.find(params.id)
            var description = result.description
            return view.render('minigame.cards.index', {
                session_id: params.id,
                description: description,
                user_id: auth.user.id
            })
        } catch (e) {
            response.route('login_path')
        }
    }
}

module.exports = CardController
