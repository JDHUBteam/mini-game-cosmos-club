'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('index');
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.on('/login').render('auth.login').as('login_path');
Route.post('/login', 'UserController.login').validator('LoginUser');
Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});
Route.get('/mini-game', 'MiniGameController.index');
Route.group(() => {
    Route.get('/cards/:id', 'MiniGame/CardController.show')
    Route.post('/cards/:id/get', 'MiniGame/CardController.getQuestion')
    Route.post('/cards/:id/finish', 'MiniGame/CardController.rank')
    Route.get('/cards/:id/rank', 'MiniGame/CardController.board').as('boardrank')
}).prefix('mini-game')