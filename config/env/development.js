'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
    db: {
        uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || '192.168.10.250:27017') + '/import_db',
        options: {
            user: 'cambio_03',
            pass: 'cambio_03'
        },
        // Enable mongoose debug mode
        debug: process.env.MONGODB_DEBUG || false
    },
    log: {
        // logging with Morgan - https://github.com/expressjs/morgan
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: 'dev',
        fileLogger: {
            directoryPath: process.cwd(),
            fileName: 'app.log',
            maxsize: 10485760,
            maxFiles: 2,
            json: false
        }
    },
    app: {
        title: defaultEnvConfig.app.title + ' - Development Environment'
    },
    mailer: {
        from: process.env.MAILER_FROM || 'MAILER_FROM',
        options: {
            service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
            auth: {
                user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
                pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
            }
        }
    },
    livereload: true,
    seedDB: {
        seed: process.env.MONGO_SEED === 'true',
        options: {
            logResults: process.env.MONGO_SEED_LOG_RESULTS !== 'false',
            seedUser: {
                username: process.env.MONGO_SEED_USER_USERNAME || 'user',
                provider: 'local',
                email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
                firstName: 'User',
                lastName: 'Local',
                displayName: 'User Local',
                roles: ['user']
            },
            seedAdmin: {
                username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
                provider: 'local',
                email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
                firstName: 'Admin',
                lastName: 'Local',
                displayName: 'Admin Local',
                roles: ['user', 'admin']
            }
        }
    },
    jwt: {
        secret: '123wee',
        expiresIn: 60000,
        algorithm: 'HS256'
    },
    stomp: {
        servers: [
            {
                host: '192.168.10.250',
                port: 61613,
                connectHeaders: {
                    'host': '/',
                    'heart-beat': '100,100'
                }
            }
        ],
        connectParams: {
            host: '192.168.10.250',
            port: 61613,
            connectHeaders: {
                host: '/'
            }
        },
        reconnectOptions: {
            maxReconnects: 5
        },
        sendParams: {
            'destination': 'mean-node-dev',
            'content-type': 'application/json'
        },
        headers: {
            'destination': 'mean-node-dev',
            'ack': 'client-individual'
        }
    }
}
;
