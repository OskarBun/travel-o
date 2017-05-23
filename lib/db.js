const Sequelize = require('sequelize')

let config = {}

if (process.env.CLEARDB_DATABASE_URL) {

    const match = process.env.CLEARDB_DATABASE_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+)\/(.+)\?/);

    config = {
        user: match[1],
        pass: match[2],
        base: match[4],
        options: {
            dialect: 'mysql',
            protocol: 'mysql',
            host: match[3],
            port: 3306,
            logging: false,
            dialectOptions: {
                ssl: true
            }
        }
    };

} else {
    config = {
        user: 'root',
        pass: 'root',
        base: 'travelo-development',
        options: {
            host: 'localhost',
            dialect: 'sqlite',

            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },

            // SQLite only
            storage: __dirname + '/../db.sqlite'
        }
    }
}

const sequelize = new Sequelize(config.base, config.user, config.pass, config.options);

const User = sequelize.define('user', {
    username: { type: Sequelize.STRING, allowNull: false},
    avatar_url: { type: Sequelize.STRING },
    color: { type: Sequelize.STRING },
    github_token: { type: Sequelize.STRING, unique: true} //This is should be encrypted
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
