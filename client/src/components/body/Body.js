import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'

import Home from '../body/home/Home'
import Dashboad from '../body/dashboad/Dashboad'

import { useSelector } from 'react-redux'
import About from './pages/About'
import WebServices from './pages/WebServices'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Terms from './pages/TermsandConditions'
import Privacy from './pages/Privacy'
import Contacts from './pages/Contacts'

// WEBS HOME
import HomeWebs from './home/Home.webs'
import HomeWebPrice from './home/Home.webPrice'
import HomeWebPay from './home/Home.webPayment'
import HomeWebConfirm from './home/Home.webConfirm'
import Shops from './dashboad/pages/Shops'

function Body() {
    const auth = useSelector(state => state.auth)
    const { isLogged, isAdmin } = auth;

    const [width, setWidth] = useState("0px");

    const handleOpenNav = () => {
        setWidth(width === "0px" ? "250px" : "0px")
    }

    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                {/* USER DASHBOARD */}
                <Route path="/dashboad" exact>
                    {isLogged ? <Dashboad handleOpenNav={handleOpenNav} width={width} /> : <NotFound />}
                </Route>
                <Route path="/shops" exact >
                    {isLogged ? <Shops handleOpenNav={handleOpenNav} width={width} /> : <NotFound />}
                </Route>

                {/* PAGES */}
                <Route path="/about" component={About} exact />
                <Route path="/websites" component={WebServices} exact />
                <Route path="/services" component={Services} exact />
                <Route path="/pricing" component={Pricing} exact />
                <Route path="/terms" component={Terms} exact />
                <Route path="/privacy" component={Privacy} exact />
                <Route path="/contacts" component={Contacts} exact />

                {/* OTHER HOME PARTS */}
                <Route path="/get_website" component={HomeWebs} exact />
                <Route path="/webs_plans" component={HomeWebPrice} exact />
                <Route path="/webs_pay" component={HomeWebPay} exact />
                <Route path="/webs_confirms" component={HomeWebConfirm} exact />

                <Route path="/*" component={NotFound} exact />
            </Switch>
        </section>
    )
}

export default Body
