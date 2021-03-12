import * as postgres_config from './postgres/postgres.config'
import * as sqlite_config from './sqlite/sqlite.config'
import * as dotenv from 'dotenv'
dotenv.config()


let db_config:any

if (process.env.DATABASE=='postgres'){
    db_config= postgres_config
}

else if (process.env.DATABASE== 'sqlite'){
    db_config= sqlite_config
}

export{db_config}

