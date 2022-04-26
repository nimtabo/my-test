import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotFound from '../../../utils/NotFound/NotFound'
import Shops from '../pages/Shops'
import Dashboard from '../Dashboad'

import './main.css'


function Main({ handleOpenNav, width }) {

  const auth = useSelector(state => state.auth)
  const { isLogged, isAdmin } = auth

  return (
    <>
      <div id="main" style={{ marginLeft: width }}>
        <button className="openbtn" onClick={handleOpenNav}>☰ Open Sidebar</button>
        <div>
          <Switch>
            <Route path="/shops" component={isLogged ? Shops : NotFound} exact />
            <Route path="/dashboard" component={isLogged ? Dashboard : NotFound} exact />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Main;