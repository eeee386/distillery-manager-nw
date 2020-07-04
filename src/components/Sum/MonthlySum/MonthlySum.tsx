import * as React from 'react';
import {DateTime} from "luxon";
import {Distillation} from "../../../models/Distillation/Distillation";
import {SumByTypes} from "../../../models/Enums/SumByTypes";
import {ConnectedComponentProps, ReduxState} from "../../../models/ConnectTypes/ConnectTypes";
import {payloadNames, tableSagaTypes} from "../../../models/Types/TableTypes/TableTypes";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {ActionFactory} from "../../../ReduxStoreHandlers/actionFactory";
import {monthMap} from "./MonthMap";
import {Fragment} from 'react';
import "./MonthlySum.scss"

class MonthlySum extends React.Component<ConnectedComponentProps> {

    state = {
        onlyThisYear: false
    }

    constructor(props: ConnectedComponentProps) {
        super(props);
        props.fetchDistillation();
    }

    prepData = (table: Distillation[], prop: SumByTypes): { [key: string]: { [key: string]: number } } | null => {
        if (!table) {
            return null;
        }
        const getYear = (e: Distillation) => e.getLuxonDate().year.toString()
        const getMonth = (e: Distillation) => monthMap[e.getLuxonDate().month.toString()];

        if (this.state.onlyThisYear) {
            const thisYear = DateTime.local().year;
            table = table.filter(e => e.getLuxonDate().year === thisYear);
        }
        const mapYear: { [key: string]: Distillation[] } = {};
        table.forEach(e => {
            if (!mapYear[getYear(e)]) {
                mapYear[getYear(e)] = [];
            }
            mapYear[getYear(e)].push(e);
        })
        console.log(mapYear);
        const mapNumber: { [key: string]: { [key: string]: number } } = {};
        Object.keys(mapYear).forEach(year => {
            if (!mapNumber[year]) {
                mapNumber[year] = {};
            }
            mapYear[year].forEach(dist => {
                if (!mapNumber[year][getMonth(dist)]) {
                    mapNumber[year][getMonth(dist)] = 0
                }
                mapNumber[year][getMonth(dist)] += prop === SumByTypes.WEIGHT ? parseInt(dist.weightInKilograms) : parseInt(dist.HLF);
            })
        })
        return mapNumber;
    }

    onlyYearButtonText = () => {
        return this.state.onlyThisYear ? "Összes" : "Csak ezévi";
    }

    renderMap(map: { [key: string]: { [key: string]: number } } | null) {
        return <Fragment>{this.props.table && map && <div>{
            Object.keys(map).map(year => <div className={"map-data-wrapper"}>
                <div>{year}</div>
                <div className={"map-month-data-wrapper"}>{Object.keys(map[year]).map(month =>
                    <div>
                        <span>{month} : </span>
                        <span>{map[year][month]}</span>
                    </div>
                )}</div>
            </div>)}</div>}</Fragment>
    }

    renderMapWrapper(title: string, map: { [key: string]: { [key: string]: number } } | null) {
        return <div className={"box"}>
            <div className={"box-title"}>{title}</div>
            {this.renderMap(map)}
        </div>
    }

    render() {
        const mapWeight = this.prepData(this.props.table, SumByTypes.WEIGHT);
        const mapHLF = this.prepData(this.props.table, SumByTypes.HLF);
        return <div className={"monthlysum-wrapper"}>
            <button className={'button is-info'}
                    onClick={() => this.setState({onlyThisYear: !this.state.onlyThisYear})}>{this.onlyYearButtonText()}</button>
            {this.renderMapWrapper("Tömeg", mapWeight)}
            {this.renderMapWrapper("Hektoliterfok", mapHLF)}
        </div>;
    }
}

const mapStateToProps = (state: ReduxState) => ({
    table: state.tables[payloadNames.TABLES],
});

const matchDispatchToProps = (dispatch: Dispatch) => ({
    fetchDistillation: () => dispatch(ActionFactory(tableSagaTypes.FETCH_TABLE)),
})

export default connect(mapStateToProps, matchDispatchToProps)(MonthlySum);