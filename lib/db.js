const Sequelize = require('sequelize');


// –– DB CONNECTION CONFIGS –– //
let config = {};
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
    };
}

// –– INIT DB –– //
const sequelize = new Sequelize(config.base, config.user, config.pass, config.options);


// –– MODEL –– //
const User = sequelize.define('user', {
    username: { type: Sequelize.STRING, allowNull: false},
    avatar_url: { type: Sequelize.STRING },
    color: { type: Sequelize.STRING },
    github_id: { type: Sequelize.INTEGER, unique: true} //This is should be encrypted
});

const Trip = sequelize.define('trip', {
    title:  { type: Sequelize.STRING, allowNull: false },
    access: { type: Sequelize.ENUM('public','private'), defaultValue: 'public'}
});

const Destination = sequelize.define('destination', {
    name: { type: Sequelize.STRING, allowNull: false },
    latlon: { type: Sequelize.GEOMETRY('POINT', 4326), allowNull: false },
    created_by: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
});

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
            model: Trip,
            key: 'id'
        }
    },
    read: { type: Sequelize.BOOLEAN, defaultValue: true },
    write: { type: Sequelize.BOOLEAN, defaultValue: true }
});


// –– ASSOCIATIONS –– //
Trip.belongsToMany(User, {
    as: 'People',
    through: Role,
    foreignKey: 'trip_id'
});

User.belongsToMany(Trip, {
    as: 'Trips',
    through: Role,
    foreignKey: 'user_id'
});

sequelize.sync({force:true});

module.exports = {
    User: User,
    Trip: Trip,
    Destination: Destination,
    Role: Role
}
