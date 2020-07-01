import {ReduxType} from '../models/Types/TypeModels/ReduxType';
import {AsyncTypes} from '../models/Types/TypeModels/AsyncTypes';
import { Type } from '../models/Types/TypeModels/Type';

export class Action {
    type: string;
    payload?: {[payloadName: string]: any}; 
    payloadName?: string;
    loading?: boolean;

    constructor(type: string, payloadName?: string, payloadContent?: any, loading?: boolean){
        this.type = type;
        if(payloadName){
            this.payload = {[payloadName]: payloadContent};
            this.payloadName = payloadName;
        }
        if(loading) {
            this.loading = loading;
        }
    }

    createAction(){
        return Object.assign({}, this);
    }
}

export const ActionFactory = (type: Type, typeContent?: any) => {
    const typeName = type.typeName;
    const payloadName = type.payloadName;
    const payloadContent = typeContent || null;
    if(type instanceof ReduxType) {
        const loading = type.asyncType === AsyncTypes.startType;
        return new Action(typeName, payloadName, payloadContent, loading).createAction();
    }
    return new Action(typeName, payloadName, payloadContent).createAction();
};