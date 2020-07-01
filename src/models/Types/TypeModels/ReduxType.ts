// All the types that directly modifies the redux state.
import {AsyncTypes} from './AsyncTypes';
import {Type} from './Type';

export class ReduxType implements Type {
    typeName: string;
    asyncType: AsyncTypes;
    payloadName?: string;
    
    constructor(typeName: string, asyncType:  AsyncTypes, payloadName?: string) {
        this.typeName = typeName;
        this.asyncType = asyncType;
        this.payloadName = payloadName;
    }
}