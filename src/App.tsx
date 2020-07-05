import * as React from 'react';
import {connect} from 'react-redux';
import TableManager from './components/Tables/TableManager';
import Search from './components/Search/Search';
import {ActionFactory, Action} from './ReduxStoreHandlers/actionFactory';
import {payloadNames, tableSagaTypes} from './models/Types/TableTypes/TableTypes';
import {ConnectedComponentProps, ReduxState} from './models/ConnectTypes/ConnectTypes';
import Sum from "./components/Sum/Sum";
import Restore from "./components/Restore/Restore";
import MonthlySum from "./components/Sum/MonthlySum/MonthlySum";
import {PageTypes} from "./models/Enums/PageTypes";
import {Case} from "./components/UtilComponents/Case";

class App extends React.Component<ConnectedComponentProps> {

    state = {
        show: PageTypes.TABLE,
    }

    constructor(props: ConnectedComponentProps) {
        super(props);
        props.connectSQL();
        props.fetchDistillation();
    }

    componentWillUnmount() {
        this.props.disconnectSQL();
    }

    render() {
        return (
            <div className={'root'}>
                <div className={'navbar'}>
                    <div className={'container'}>
                        <span className={'navbar-link link'}
                             onClick={() => this.setState({show: PageTypes.SEARCH})}>Keresés
                        </span>
                        <span className={'navbar-link link'}
                             onClick={() => this.setState({show: PageTypes.TABLE})}>Főzetések
                        </span>
                        <span className={'navbar-link link'}
                             onClick={() => this.setState({show: PageTypes.SUM})}>Összegzés
                        </span>
                        <span className={'navbar-link link'}
                             onClick={() => this.setState({show: PageTypes.MONTHLYSUM})}>Havi összegzés
                        </span>
                        <span className={'navbar-link link'}
                             onClick={() => this.setState({show: PageTypes.RESTORE})}>Visszaállítás
                        </span>
                    </div>
                </div>
                <div className={'routeRoot'} style={{width: '100%'}}>
                    <Case value={PageTypes.SEARCH} data={this.state.show}>
                        <Search />
                    </Case>
                    <Case value={PageTypes.TABLE} data={this.state.show}>
                        <TableManager table={this.props.table}/>
                    </Case>
                    <Case value={PageTypes.SUM} data={this.state.show}>
                        <Sum/>
                    </Case>
                    <Case value={PageTypes.MONTHLYSUM} data={this.state.show}>
                        <MonthlySum table={this.props.table}/>
                    </Case>
                    <Case value={PageTypes.RESTORE} data={this.state.show}>
                        <Restore/>
                    </Case>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    table: state.tables[payloadNames.TABLES],
});

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
    connectSQL: () => dispatch(ActionFactory(tableSagaTypes.CONNECT_SQL)),
    disconnectSQL: () => dispatch(ActionFactory(tableSagaTypes.DISCONNECT_SQL)),
    fetchDistillation: () => dispatch(ActionFactory(tableSagaTypes.FETCH_TABLE)),
});

export default connect(mapStateToProps, matchDispatchToProps)(App);