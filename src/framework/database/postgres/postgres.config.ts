import { string } from "joi"

let db:any = {
providers: 'postgres',
DB_URL:  'postgresql://prisma:prisma@localhost:5432/prisma?schema=public'
}

export{db}



