import * as React from 'react'
import {connect} from 'react-redux';
import {payloadNames, searchSagaTypes} from '../../models/Types/SearchTypes/SearchTypes';
import {ConnectedComponentProps, StateProps} from '../../models/ConnectTypes/ConnectTypes';
import {Action, ActionFactory} from '../../ReduxStoreHandlers/actionFactory';
import './Search.scss';
import SearchByNameForm from './SearchByNameForm/SearchByNameForm'
import SearchByTaxIDForm from './SearchByTaxIDForm/SearchByTaxIDForm';
import TableList from '../Tables/TableList/TableList';
import {Distillation} from '../../models/Distillation/Distillation';
import {tableSagaTypes} from '../../models/Types/TableTypes/TableTypes';
import _ from 'lodash';

class Search extends React.Component<ConnectedComponentProps> {

    state = {
        onlyThisYear: false
    }

    renderResults = () => {
        if (this.props.results) {
            const {activeName, activeTaxID, results} = this.props.results;
            if (_.isEmpty(results)) {
                return <div>Nincs találat erre a
                    keresésre: {activeName !== undefined ? `Név: ${activeName || ''}` : `AdóSzám: ${activeTaxID || ''}`}</div>
            } else {
                return (<div className={"searchlist-wrapper"}>
                    <TableList
                        updateDistillation={this.props.updateDistillation}
                        table={this.props.results.results}
                        deleteDistillation={this.props.deleteDistillation}/></div>)
            }
        }
    };

    render() {
        return (
            <div className={"search-wrapper"}>
                <div>
                    <SearchByNameForm onSubmit={this.props.searchByName}/>
                    <SearchByTaxIDForm onSubmit={this.props.searchByTaxID}/>
                </div>
                {this.renderResults()}
            </div>
        );
    }
}

const mapStateToProps = (state: StateProps) => ({
    results: state.search[payloadNames.SEARCH_RESULT],
    loading: state.search[payloadNames.SEARCH_LOADING],
});

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
    searchByName: (values: { [key: string]: string }) => dispatch(ActionFactory(searchSagaTypes.SEARCH_BY_NAME, values.name)),
    searchByTaxID: (values: { [key: string]: string }) => dispatch(ActionFactory(searchSagaTypes.SEARCH_BY_TAXID, values.taxID)),
    updateDistillation: (updatedDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.UPDATE_ONE, updatedDist)),
    deleteDistillation: (deletedDist: Distillation) => dispatch(ActionFactory(tableSagaTypes.DELETE_ONE, deletedDist)),
});

export default connect(mapStateToProps, matchDispatchToProps)(Search);