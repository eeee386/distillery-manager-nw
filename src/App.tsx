import * as React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import TableManager from './components/Tables/TableManager';
import Search from './components/Search/Search';
import { ActionFactory, Action } from './ReduxStoreHandlers/actionFactory';
import { tableSagaTypes } from './models/Types/TableTypes/TableTypes';
import { ConnectedComponentProps } from './models/ConnectTypes/ConnectTypes';
import Sum from "./components/Sum/Sum";
import Restore from "./components/Restore/Restore";

class App extends React.Component<ConnectedComponentProps> {
  constructor(props: ConnectedComponentProps) {
    super(props);
    props.connectSQL();
  }

  componentWillUnmount() {
    this.props.disconnectSQL();
  }

  render() {
    return (
      <div className={'root'}>
        <div className={'navbar'}>
          <div className={'container'}>
            <a className={'.navbar-link link'} href={'/search'}>Keresés</a>
            <a className={'.navbar-link link'} href={'/'}>Főzetések</a>
            <a className={'.navbar-link link'} href={'/sum'}>Összegzés</a>
            <a className={'.navbar-link link'} href={'/restore'}>Összegzés</a>
          </div>
        </div>
        <Router>
          <div className={'routeRoot'} style={{width: '100%'}}>
            <Route exact path='/' component={TableManager} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/sum' component={Sum} />
            <Route exact path='/restore' component={Restore} />
          </div>
        </Router>
      </div>
    );
  }
}

const matchDispatchToProps = (dispatch: React.Dispatch<Action>) => ({
  connectSQL: () => dispatch(ActionFactory(tableSagaTypes.CONNECT_SQL)),
  disconnectSQL: () => dispatch(ActionFactory(tableSagaTypes.DISCONNECT_SQL)) 
});

export default connect(null, matchDispatchToProps) (App);