'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BoardranksSchema extends Schema {
  up () {
    this.create('boardranks', (table) => {
      table.integer('user_id')
      table.integer('session_id')
      table.integer('point')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('boardranks')
  }
}

module.exports = BoardranksSchema
