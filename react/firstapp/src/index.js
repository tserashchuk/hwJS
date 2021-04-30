import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Link, Switch, useParams, useHistory, useLocation } from "react-router-dom";


import Counter from './counterComp/App'
import Inp from './inputsChange/Inputs'
import DivChanger from './divChanger/divChanger'
import ToDo from './toDo/ToDo'
import Tables from './table/Table'
import Film from './cinemaApp/Film'
import Pogodu from './pogodu/pogodu'
import Calendar from './calendar/Calendar'
import Ant from './antd/Antd'
import Converter from './converter/converter'
import News from './news/newsComponent'
// import {App} from './App/App.js'

const Routes = () =>{ return ['/сounter','/inp','/divChanger','/todo','/tables','/film','/pogodu','/calendar','/ant','/converter','/news'].map((element)=>{
    return <><Link to={element}>{element}</Link><br/></>
}) }

ReactDOM.render(
<>
<Router>
<Routes></Routes>

<Switch>
                <Route path="/сounter" exact component={Counter} />
                <Route path="/inp" exact component={Inp} />
                <Route path="/divChanger" exact component={DivChanger} />
                <Route path="/todo" exact component={ToDo} />
                <Route path="/tables" exact component={Tables} />
                <Route path="/film" exact component={Film} />
                <Route path="/pogodu" exact component={Pogodu} />
                <Route path="/calendar" exact component={Calendar} />
                <Route path="/ant" exact component={Ant}/>
                <Route path="/converter" exact component={Converter} />
                <Route path="/news" exact component={News} />

</Switch>



</Router>
</>

,document.getElementById('root'));



