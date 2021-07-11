import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import NotFound from '../../../utils/NotFound/NotFound'
import Shops from '../pages/Shops'


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
          </Switch>
        </div>
      </div>
    </>
  );
}

export default Main;