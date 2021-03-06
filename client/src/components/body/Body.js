import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import ProfileB from '../body/profile/ProfileB'
import EditUser from '../body/profile/EditUser'

import Home from '../body/home/Home'
// import Dashboad from '../body/dashboad/Dashboad'

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
import Listing from './pages/Listing'
import Products from './dashboad/pages/Products'
import Users from './dashboad/pages/Users'
import Billing from './dashboad/pages/Billing'
import BuyerSignup from './auth/BuyerSignup'
import UserLayout from './layouts/User'
import AdminLayout from './layouts/Admin'
import Overview from './admin/overview/Overview'
import Stores from './admin/stores'
import Checkout from './pages/Checkout'
import PayHistory from './dashboad/pages/PayHistory'
import Renewals from './dashboad/pages/Renewals'
import Sellers from './admin/sellers/Sellers'
import Buyers from './admin/buyers'
import Tickets from './admin/tickets'
import TeamMembers from './admin/teamMembers'
import AdminProducts from './admin/products'


function Body() {
    const auth = useSelector(state => state.auth)
    const { isLogged, isAdmin } = auth;

    const [width, setWidth] = useState("0px")

    const handleOpenNav = () => {
        setWidth(width === "0px" ? "250px" : "0px")
    }

    return (
        <section>
            <Switch>
                {/* ADMINS */}
                <Route path='/admin/:path?' exact>
                    <AdminLayout>
                        <Switch>
                            <Route path="/admin/users" exact >
                                {isAdmin ? <Users /> : <NotFound />}
                            </Route>
                            <Route path="/admin/dashboard" exact >
                                {isAdmin ? <Overview /> : <NotFound />}
                            </Route>
                            <Route path="/admin/sellers" exact >
                                {isAdmin ? <Sellers /> : <NotFound />}
                            </Route>
                            <Route path="/admin/buyers" exact >
                                {isAdmin ? <Buyers /> : <NotFound />}
                            </Route>
                            <Route path="/admin/tickets" exact >
                                {isAdmin ? <Tickets /> : <NotFound />}
                            </Route>
                            <Route path="/admin/team" exact >
                                {isAdmin ? <TeamMembers /> : <NotFound />}
                            </Route>
                            <Route path="/admin/stores" exact >
                                {isAdmin ? <Stores /> : <NotFound />}
                            </Route>
                            <Route path="/admin/products" exact >
                                {isAdmin ? <AdminProducts /> : <NotFound />}
                            </Route>
                            <Route path="/*" component={NotFound} exact />
                        </Switch>
                    </AdminLayout>
                </Route>


                {/* USER ROUTES */}
                <Route>
                    <UserLayout>
                        <Switch>
                            <Route path="/" component={Home} exact />

                            <Route path="/login" component={isLogged ? NotFound : Login} exact />
                            <Route path="/register" component={isLogged ? NotFound : Register} exact />
                            <Route path="/buy" component={isLogged ? NotFound : BuyerSignup} exact />

                            <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                            <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                            <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />
                            {/* <Route path="/profile" component={isLogged ? Profile : NotFound} exact /> */}
                            <Route path="/profile" component={isLogged ? ProfileB : NotFound} exact />
                            <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />

                            {/* USER DASHBOARD */}
                            <Route path="/shops" exact >
                                {isLogged ? <Shops handleOpenNav={handleOpenNav} width={width} /> : <NotFound />}
                            </Route>
                            <Route path="/products" exact >
                                {isLogged ? <Products /> : <NotFound />}
                            </Route>

                            <Route path="/billing" exact >
                                {isLogged ? <Billing /> : <NotFound />}
                            </Route>
                            <Route path="/payment_history" exact >
                                {isLogged ? <PayHistory /> : <NotFound />}
                            </Route>
                            <Route path="/renew" exact >
                                {isLogged ? <Renewals /> : <NotFound />}
                            </Route>
                            <Route path="/checkout" component={Checkout} exact />

                            {/* PAGES */}
                            <Route path="/about" component={About} exact />
                            <Route path="/websites" component={WebServices} exact />
                            <Route path="/services" component={Services} exact />
                            <Route path="/pricing" component={Pricing} exact />
                            <Route path="/terms" component={Terms} exact />
                            <Route path="/privacy" component={Privacy} exact />
                            <Route path="/contacts" component={Contacts} exact />
                            <Route path="/listing" component={Listing} exact />

                            {/* OTHER HOME PARTS */}
                            <Route path="/get_website" component={HomeWebs} exact />
                            <Route path="/webs_plans" component={HomeWebPrice} exact />
                            <Route path="/webs_pay" component={HomeWebPay} exact />
                            <Route path="/webs_confirms" component={HomeWebConfirm} exact />

                            <Route path="/*" component={NotFound} exact />
                        </Switch>
                    </UserLayout>
                </Route>

            </Switch>
        </section>
    )
}

export default Body
