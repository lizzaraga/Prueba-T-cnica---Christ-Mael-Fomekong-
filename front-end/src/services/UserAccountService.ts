import {IUserAccount} from "../models";
import axios from "axios";

export class UserAccountService{

    async save(payload: {name: string, remainingAmount: number}){
        const response = await axios.post<IUserAccount>(`Api/UserAccount/SaveOrUpdate`, payload)
        return response.data
    }

    async loadByName(name: string){
        const response = await axios.get<IUserAccount>(`Api/UserAccount/FindByName/${name}`)
        return response.data
    }
}
