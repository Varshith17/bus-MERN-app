import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './Components/HomePage'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Dashboard from './Components/Dashboard';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer'
const store = createStore( reducer );
function App() {
  return (
    <div className="app">
      <Provider store={store}>
      <Router>
        <Header/>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/dashboard' component={Dashboard}/>
          </Switch>
          <Footer/>
      </Router>
      </Provider>
    </div>
  );
}

export default App;
