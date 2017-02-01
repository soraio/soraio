var bcrypt = require('bcrypt')
    // Generate a salt.
    salt = bcrypt.genSaltSync(10)

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries.
  return knex('users').truncate()
    .then(function () {
      return Promise.all([
        // Inserts seed entries.
        knex('users').insert({
          username: 'admin',
          password: bcrypt.hashSync('admin', salt),
          firstName: 'Eries',
          lastName: 'Trisnadi',
          email: 'zdumb1885@outlook.com',
          birth: new Date('1996/05/05'),
          role_id: 1,
          remember_token: null,
          created_at: new Date(),
          updated_at: new Date()
        }),
        knex('users').insert({
          username: 'super',
          password: bcrypt.hashSync('super', salt),
          firstName: 'Mufti',
          lastName: 'Faisal',
          email: 'mufti.faisal@hotmail.com',
          birth: new Date('1996/05/01'),
          role_id: 2,
          remember_token: null,
          created_at: new Date(),
          updated_at: new Date()
        })
      ])
    })
}
