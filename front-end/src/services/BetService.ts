import axios from "axios";
import {IBetResult} from "../models/apis/res";

export class BetService{

    async getBetResult(): Promise<IBetResult>{
        const response = await axios.get<IBetResult>(`Api/Bet/GenerateBetResult`)
        return response.data
    }


}
