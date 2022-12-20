import { AuthGuard } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import { ExecutionContext } from "@nestjs/common/interfaces";

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor(){super()}

    async getRequest(context: ExecutionContext){
        // console.log(context.);
        return context
        
    }

}
