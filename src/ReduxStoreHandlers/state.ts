import { tableTypes } from '../models/Types/TableTypes/TableTypes';
import { searchTypes } from '../models/Types/SearchTypes/SearchTypes';
import { Action } from './actionFactory';
import {reducer as form} from 'redux-form';
import {combineReducers} from 'redux';
import { ReduxState } from '../models/ConnectTypes/ConnectTypes';
import {sumTypes} from "../models/Types/SumTypes/SumTypes";
import {ReduxType} from "../models/Types/TypeModels/ReduxType";
import {restoreTypes} from "../models/Types/RestoreTypes/RestoreTypes";

const reducerFactory = (typesObject: {[key:string]: ReduxType}) => (state: ReduxState = {}, action: Action) => {
  const {type, payload} = action;
  if(typesObject[type]){
    return {...state, ...payload}
  } else {
    return state;
  }
}

export const rootReducer = combineReducers({
    search: reducerFactory(searchTypes),
    tables: reducerFactory(tableTypes),
    sum: reducerFactory(sumTypes),
    restore: reducerFactory(restoreTypes),
    form,
});