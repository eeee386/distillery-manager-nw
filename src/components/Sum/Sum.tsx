import * as React from 'react';
import {ConnectedComponentProps, StateProps} from "../../models/ConnectTypes/ConnectTypes";
import {Action, ActionFactory} from "../../ReduxStoreHandlers/actionFactory";
import {connect} from "react-redux";
import {sumSagaTypes, payloadNames} from "../../models/Types/SumTypes/SumTypes";
import "./Sum.scss"
import SumHLFByNameForm from "./SumByNameForm/SumHLFByNameForm";
import SumWeightByNameForm from "./SumByNameForm/SumWeightByNameForm";
import SumWeightByTaxIDForm from "./SumByTaxIDForm/SumWeightByTaxIDForm";
import SumHLFByTaxIDForm from "./SumByTaxIDForm/SumHLFByTaxIDForm";
import _ from 'lodash';
import { Fragment } from 'react';

class Sum extends React.Component<ConnectedComponentProps> {

    renderResults(): JSX.Element | null {
        if(this.props.result){
            const {activeName, activeTaxID, result} = this.props.result;
            if(!_.isEmpty(result)){
                return <Fragment>{Object.keys(this.props.result.result).map((key: string) => <div className={"sum-data"} key={`${key}-${this.props.result.result[key]}`}>
                    <span>Eredmény: </span><span>{this.props.result.result[key]}</span></div>)}</Fragment>
            } else {
                return <div>Nincs találat erre a keresésre: {activeName ? `Név: ${activeName}` : `AdóSzám: ${activeTaxID}`}</div>
            }
        }
        return null;
    }

    render(): JSX.Element {
        return (
            <div className={"sum-wrapper"}>
                <SumHLFByNameForm onSubmit={this.props.sumHLFByName} form={'SumHLFByNameForm'} />
                <SumWeightByNameForm onSubmit={this.props.sumWeightByName} form={'SumWeightByNameForm'}/>
                <SumHLFByTaxIDForm onSubmit={this.props.sumHLFByTaxID} form={'SumHLFByTaxIDForm'}/>
                <SumWeightByTaxIDForm onSubmit={this.props.sumWeightByTaxID} form={'SumWeightByTaxIDForm'}/>
                {this.renderResults()}
            </div>
        );
    }
}

const mapStateToProps = (state: StateProps) => ({
    result: state.sum[payloadNames.SUM_RESULT],
    loading: state.sum[payloadNames.SUM_LOADING],
});

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
    sumHLFByName: (values: {[key: string]: string}) => dispatch(ActionFactory(sumSagaTypes.SUM_HLF_BY_NAME, values.name)),
    sumWeightByName: (values: {[key: string]: string}) => dispatch(ActionFactory(sumSagaTypes.SUM_WEIGHT_BY_NAME, values.name)),
    sumHLFByTaxID: (values: {[key: string]: string}) => dispatch(ActionFactory(sumSagaTypes.SUM_HLF_BY_TAXID, values.taxID)),
    sumWeightByTaxID: (values: {[key: string]: string}) => dispatch(ActionFactory(sumSagaTypes.SUM_WEIGHT_BY_TAXID, values.taxID)),
});

export default connect(mapStateToProps, matchDispatchToProps)(Sum);