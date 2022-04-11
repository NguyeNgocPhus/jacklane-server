export abstract class IPasswordService {
    abstract hashPassword(password:string):Promise<string>
    abstract verifyHashPassword(password:string,hashPassword:string):Promise<string>
}