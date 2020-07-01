import {SagaType} from '../TypeModels/SagaType';
import {ReduxType} from '../TypeModels/ReduxType';
import {AsyncTypes} from '../TypeModels/AsyncTypes';

export enum payloadNames {
    TABLE_LOADING = 'tableLoading',
    TABLE_EXCEPTION = 'tableException',
    TABLES = 'tables',
    ADDED_TO_TABLE = 'addedToTable',
    DELETED_FROM_TABLE = 'deletedFromTable',
    UPDATED_IN_TABLE = 'updatedInTable',
}

export const tableSagaTypes: {[key: string]: SagaType} = {
    CONNECT_SQL: new SagaType('CONNECT_SQL'),
    FETCH_TABLE: new SagaType('FETCH_TABLE'),
    ADD_NEW: new SagaType('ADD_NEW', 'addableDistillation'),
    DELETE_ONE: new SagaType('DELETE_ONE', 'deletableDistillation'),
    UPDATE_ONE: new SagaType('UPDATE_ONE', 'updatableDistillation'),
    DISCONNECT_SQL: new SagaType('DISCONNECT_SQL'),
}

export const tableTypes: {[key: string]: ReduxType} = {
    FETCH_TABLE_STARTED: new ReduxType('FETCH_TABLE_STARTED', AsyncTypes.startType, payloadNames.TABLE_LOADING),
    FETCH_TABLE_FAILED: new ReduxType('FETCH_TABLE_FAILED', AsyncTypes.failType, payloadNames.TABLE_EXCEPTION),
    FETCH_TABLE_COMPLETED: new ReduxType('FETCH_TABLE_COMPLETED', AsyncTypes.completeType, payloadNames.TABLES),
    ADD_NEW_STARTED: new ReduxType('ADD_NEW_STARTED', AsyncTypes.startType, payloadNames.TABLE_LOADING),
    ADD_NEW_FAILED: new ReduxType('ADD_NEW_FAILED', AsyncTypes.failType, payloadNames.TABLE_EXCEPTION),
    ADD_NEW_COMPLETED: new ReduxType('ADD_NEW_COMPLETED', AsyncTypes.completeType, payloadNames.ADDED_TO_TABLE),
    DELETE_ONE_STARTED: new ReduxType('DELETE_ONE_STARTED', AsyncTypes.startType, payloadNames.TABLE_LOADING ),
    DELETE_ONE_FAILED: new ReduxType('DELETE_ONE_FAILED', AsyncTypes.failType, payloadNames.TABLE_EXCEPTION ),
    DELETE_ONE_COMPLETED: new ReduxType('DELETE_ONE_COMPLETED', AsyncTypes.completeType, payloadNames.DELETED_FROM_TABLE),
    UPDATE_ONE_STARTED: new ReduxType('UPDATE_ONE_STARTED', AsyncTypes.startType, payloadNames.TABLE_LOADING ),
    UPDATE_ONE_FAILED: new ReduxType('UPDATE_ONE_FAILED', AsyncTypes.failType, payloadNames.TABLE_EXCEPTION ),
    UPDATE_ONE_COMPLETED: new ReduxType('UPDATE_ONE_COMPLETED', AsyncTypes.completeType, payloadNames.UPDATED_IN_TABLE),
    CONNECTION_STARTED: new ReduxType('CONNECTION_STARTED', AsyncTypes.startType, payloadNames.TABLE_LOADING),
    CONNECTION_FAILED: new ReduxType('CONNECTION_FAILED', AsyncTypes.failType, payloadNames.TABLE_EXCEPTION),
    CONNECTION_COMPLETED: new ReduxType('CONNECTION_COMPLETE', AsyncTypes.completeType),
    DISCONNECTION_STARTED: new ReduxType('DISCONNECTION_STARTED', AsyncTypes.startType, payloadNames.TABLE_LOADING),
    DISCONNECTION_FAILED: new ReduxType('DISCONNECTION_FAILED', AsyncTypes.failType, payloadNames.TABLE_EXCEPTION),
    DISCONNECTION_COMPLETED: new ReduxType('DISCONNECTION_COMPLETE', AsyncTypes.completeType),
}