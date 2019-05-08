'use strict'

/*
|--------------------------------------------------------------------------
| CardSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database  = use('Database')
const Drive = use('Drive')

class CardSeeder {
  static async run () {
    const con = await Drive.get('1.json', 'utf-8')
    await Database.table('cards').insert([
      {
        title: 'Mini Game Card - Session 2',
        description: 'Từ vựng 50 bài mina',
        content: con
      }
    ])
  }
}

module.exports = CardSeeder
