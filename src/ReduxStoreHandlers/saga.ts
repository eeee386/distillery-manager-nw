import {call, put, all, takeEvery, Effect, select} from 'redux-saga/effects'
import {SQLService} from '../SQLService/SQLService';
import {ActionFactory, Action} from './actionFactory';
import {searchTypes, searchSagaTypes, payloadNames} from '../models/Types/SearchTypes/SearchTypes';
import {tableTypes, tableSagaTypes, payloadNames as tablePayloadNames} from '../models/Types/TableTypes/TableTypes';
import {StateProps} from "../models/ConnectTypes/ConnectTypes";
import {Distillation} from "../models/Distillation/Distillation";
import {sumSagaTypes, sumTypes} from "../models/Types/SumTypes/SumTypes";
import {restoreSagaTypes, restoreTypes} from "../models/Types/RestoreTypes/RestoreTypes";

function* handleSearch(result: {activeName?: string, activeTaxID?: string, results: Distillation[]}): IterableIterator<Effect> {
    if (result.activeName) {
        yield put(ActionFactory(searchSagaTypes.SEARCH_BY_NAME, result.activeName))
    } else {
        yield put(ActionFactory(searchSagaTypes.SEARCH_BY_TAXID, result.activeTaxID))
    }
}

function* handleUpdateOrDelete(): IterableIterator<Effect> {
    const result = yield select((state: StateProps) => state.search[payloadNames.SEARCH_RESULT])
    if (result) {
        yield call(() => handleSearch(result));
    } else {
        yield call(fetchDistillations)
        const table = yield select((state: StateProps) => state.tables[tablePayloadNames.TABLES]);
        SQLService.saveDataToFile(table);
    }
}

function* handleDisconnectAndCreate(): IterableIterator<Effect>{
    const table = yield select((state: StateProps) => state.tables[tablePayloadNames.TABLES])
    SQLService.saveDataToFile(table);
}

const sqlService = new SQLService();

function* connectSql(): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.CONNECTION_STARTED));
    try {
        yield call(sqlService.createIndex);
        yield put(ActionFactory(tableTypes.CONNECTION_COMPLETED));
    } catch (error) {
        yield put(ActionFactory(tableTypes.CONNECTION_FAILED, error));
    }
}

function* watchConnectSql(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.CONNECT_SQL.typeName, connectSql);
}

function* disconnectSql(): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.DISCONNECTION_STARTED));
    try {
        yield call(handleDisconnectAndCreate);
        yield put(ActionFactory(tableTypes.DISCONNECTION_COMPLETED));
    } catch (error) {
        yield put(ActionFactory(tableTypes.DISCONNECTION_FAILED));
    }
}

function* watchDisconnectSql(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.DISCONNECT_SQL.typeName, disconnectSql);
}

function* fetchDistillations(): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.FETCH_TABLE_STARTED));
    try {
        const distillations = yield call(sqlService.findAll);
        yield put(ActionFactory(tableTypes.FETCH_TABLE_COMPLETED, distillations));
    } catch (error) {
        yield put(ActionFactory(tableTypes.FETCH_TABLE_FAILED, error));
    }
}

export function* watchFetchDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.FETCH_TABLE.typeName, fetchDistillations);
}

function* createDistillation(action: Action): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.ADD_NEW_STARTED));
    try {
        const payloadToSend = !!action.payload && !!tableSagaTypes.ADD_NEW.payloadName && action.payload[tableSagaTypes.ADD_NEW.payloadName];
        const newDist = yield call(() => {
            return sqlService.createNewDistillation(payloadToSend)
        });
        yield put(ActionFactory(tableTypes.ADD_NEW_COMPLETED, newDist));
        yield call(fetchDistillations);
        yield call(handleDisconnectAndCreate);
    } catch (error) {
        yield put(ActionFactory(tableTypes.ADD_NEW_FAILED, error));
    }
}

function* watchCreateDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.ADD_NEW.typeName, createDistillation);
}

function* updateDistillation(action: Action): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.UPDATE_ONE_STARTED));
    try {
        const payloadToSend = !!action.payload && !!tableSagaTypes.UPDATE_ONE.payloadName && action.payload[tableSagaTypes.UPDATE_ONE.payloadName];
        const updatedDistillation = yield call(() => sqlService.updateDistillation(payloadToSend));
        yield put(ActionFactory(tableTypes.UPDATE_ONE_COMPLETED, updatedDistillation));
        yield call(handleUpdateOrDelete);
    } catch (error) {
        yield put(ActionFactory(tableTypes.UPDATE_ONE_FAILED, error));
    }
}

function* watchUpdateDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.UPDATE_ONE.typeName, updateDistillation);
}


function* deleteDistillation(action: Action): IterableIterator<Effect> {
    yield put(ActionFactory(tableTypes.DELETE_ONE_STARTED));
    try {
        const payloadToSend = !!action.payload && !!tableSagaTypes.DELETE_ONE.payloadName && action.payload[tableSagaTypes.DELETE_ONE.payloadName];
        const deletedDistillation = yield call(() => sqlService.deleteDistillation(payloadToSend));
        yield put(ActionFactory(tableTypes.DELETE_ONE_COMPLETED, deletedDistillation));
        yield call(handleUpdateOrDelete);
    } catch (error) {
        yield put(ActionFactory(tableTypes.DELETE_ONE_FAILED, error));
    }
}

function* watchDeleteDistillation(): IterableIterator<Effect> {
    yield takeEvery(tableSagaTypes.DELETE_ONE.typeName, deleteDistillation);
}

function* searchByName(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(searchTypes.START_SEARCH_BY_NAME));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName];
        const results = yield call(() => sqlService.findAllByName(payloadToSend));
        yield put(ActionFactory(searchTypes.SEARCH_BY_NAME_COMPLETED, {results, activeName: payloadToSend}));
    } catch (error) {
        yield put(ActionFactory(searchTypes.SEARCH_BY_NAME_FAILED, error));
    }
}

function* watchSearchByName(): IterableIterator<Effect> {
    yield takeEvery(searchSagaTypes.SEARCH_BY_NAME.typeName, searchByName);
}

function* searchByTaxID(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(searchTypes.START_SEARCH_BY_TAXID));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName];
        const results = yield call(() => sqlService.findAllByTaxID(payloadToSend));
        yield put(ActionFactory(searchTypes.SEARCH_BY_TAXID_COMPLETED, {results, activeTaxID: payloadToSend}));
    } catch (error) {
        yield put(ActionFactory(searchTypes.SEARCH_BY_TAXID_FAILED, error))
    }
}

function* watchSearchByTaxID(): IterableIterator<Effect> {
    yield takeEvery(searchSagaTypes.SEARCH_BY_TAXID.typeName, searchByTaxID);
}

function* sumHLFByName(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(sumTypes.START_SUM_HLF_BY_NAME));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName];
        const result = yield call(() => sqlService.sumAllHLFByName(payloadToSend));
        yield put(ActionFactory(sumTypes.SUM_HLF_BY_NAME_COMPLETED, {result, activeName: payloadToSend}));
    } catch (error) {
        yield put(ActionFactory(sumTypes.SUM_HLF_BY_NAME_FAILED, error));
    }
}

function* watchSumHLFByName(): IterableIterator<Effect> {
    yield takeEvery(sumSagaTypes.SUM_HLF_BY_NAME.typeName, sumHLFByName);
}

function* sumWeightByName(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(sumTypes.START_SUM_WEIGHT_BY_NAME));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName];
        const result = yield call(() => sqlService.sumAllWeightByName(payloadToSend));
        yield put(ActionFactory(sumTypes.SUM_WEIGHT_BY_NAME_COMPLETED, {result, activeName: payloadToSend}));
    } catch (error) {
        yield put(ActionFactory(sumTypes.SUM_WEIGHT_BY_NAME_FAILED, error));
    }
}

function* watchSumWeightHLFByName(): IterableIterator<Effect> {
    yield takeEvery(sumSagaTypes.SUM_WEIGHT_BY_NAME.typeName, sumWeightByName);
}

function* sumHLFByTaxID(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(sumTypes.START_SUM_HLF_BY_TAXID));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName];
        const result = yield call(() => sqlService.sumAllHLFByTaxID(payloadToSend));
        yield put(ActionFactory(sumTypes.SUM_HLF_BY_TAXID_COMPLETED, {result, activeTaxID: payloadToSend}));
    } catch (error) {
        yield put(ActionFactory(sumTypes.SUM_HLF_BY_TAXID_FAILED, error));
    }
}

function* watchSumHLFByTaxID(): IterableIterator<Effect> {
    yield takeEvery(sumSagaTypes.SUM_HLF_BY_TAXID.typeName, sumHLFByTaxID);
}

function* sumWeightByTaxID(action: Action): IterableIterator<Effect> {
    const {payload, payloadName} = action;
    yield put(ActionFactory(sumTypes.START_SUM_WEIGHT_BY_TAXID));
    try {
        const payloadToSend = !!payload && !!payloadName && payload[payloadName];
        const result = yield call(() => sqlService.sumAllWeightByTaxID(payloadToSend));
        yield put(ActionFactory(sumTypes.SUM_WEIGHT_BY_TAXID_COMPLETED, {result, activeTaxID: payloadToSend}));
    } catch (error) {
        yield put(ActionFactory(sumTypes.SUM_WEIGHT_BY_TAXID_FAILED, error));
    }
}

function* watchSumWeightHLFByTaxID(): IterableIterator<Effect> {
    yield takeEvery(sumSagaTypes.SUM_WEIGHT_BY_TAXID.typeName, sumWeightByTaxID);
}

function* restoreDistillations(): IterableIterator<Effect> {
    yield put(ActionFactory(restoreTypes.START_RESTORE));
    try {
        yield call(() => sqlService.restoreDB());
        yield put(ActionFactory(restoreTypes.RESTORE_COMPLETED));
    } catch (error) {
        yield put(ActionFactory(restoreTypes.RESTORE_FAILED, error));
    }
}

export function* watchRestoreDistillation(): IterableIterator<Effect> {
    yield takeEvery(restoreSagaTypes.RESTORE.typeName, restoreDistillations);
}

export function* watcherSagas(): IterableIterator<Effect> {
    yield all([
        watchConnectSql(),
        watchDisconnectSql(),
        watchFetchDistillation(),
        watchCreateDistillation(),
        watchUpdateDistillation(),
        watchDeleteDistillation(),
        watchSearchByName(),
        watchSearchByTaxID(),
        watchSumHLFByName(),
        watchSumWeightHLFByName(),
        watchSumHLFByTaxID(),
        watchSumWeightHLFByTaxID(),
        watchRestoreDistillation()
    ])
}