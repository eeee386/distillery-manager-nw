import {Dispatch} from 'react';
import {Action} from '../../ReduxStoreHandlers/actionFactory'

export type DispatchProps = {[key: string]: (param?: any)=> Dispatch<Action>};
export type StateProps = {[key:string]: any};
export type ReduxState = {[key:string]: any};
export type ConnectedComponentProps = DispatchProps & StateProps;