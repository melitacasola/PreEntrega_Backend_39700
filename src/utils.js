import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export default __dirname;

export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

//validacion
export const isValidPass = (password, email) =>{
    return bcrypt.compareSync(password, email.password)
}