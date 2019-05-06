'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CardsSchema extends Schema {
  up () {
    this.create('cards', (table) => {
      table.increments()
      table.string('title', 150).notNullable()
      table.text('decription')
      table.text('content').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('cards')
  }
}

module.exports = CardsSchema