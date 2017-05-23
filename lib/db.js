const Sequelize = require('sequelize')

const dev = process.env.NODE_ENV === 'development'

const sequelize = new Sequelize('travelo-development', 'root', 'root', {
    host: dev ? 'localhost' : process.env.CLEARDB_DATABASE_URL,
    dialect: dev ? 'sqlite' : 'mysql',

    // pool: {
    //   max: 2,
    //   min: 0,
    //   idle: 10000
    // },

    // SQLite only
    storage: __dirname + '/../db.sqlite'
});

const User = sequelize.define('user', {
    username: { type: Sequelize.STRING, allowNull: false}
})

const Trip = sequelize.define('trip', {
    title:  { type: Sequelize.STRING, allowNull: false },
    access: { type: Sequelize.ENUM('public','private'), defaultValue: 'public'}
})

const Destination = sequelize.define('destination', {
    name: { type: Sequelize.STRING, allowNull: false },
    latlon: { type: Sequelize.GEOMETRY('POINT', 4326), allowNull: false }
})

const Role = sequelize.define('role', {
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    trip_id: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    read: { type: Sequelize.BOOLEAN, defaultValue: true },
    write: { type: Sequelize.BOOLEAN, defaultValue: true }
})

sequelize.sync({force:false});

module.exports = {
    User: User
}
