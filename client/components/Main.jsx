import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store.js'
import {BrowserRouter, Route, NavLink, withRouter} from 'react-router-dom'
import ProductSearch from './ProductSearch'
import Product from './Product'
import Cart from './Cart';
import Login from './Login';
import Admin from './Admin'
import ProductHistory from './ProductHistory'
import Signup from './Signup';
import { verifyUser, loadUser, fetchCart } from '../reducers';

class Main extends Component {

	componentDidMount() {
		const { loginUser, loadSessionUser, getCart } = this.props;
		console.log("*************************Settng Default User to Rav*****************************");
		return loadSessionUser()
		      .then(() => {
		      		const {user} = this.props;
		      		if (user.id) getCart(user.id);
		      })
		      .catch(err => {
		        console.log('error occurred ', err.response.data);
		        throw err;
		      });
	}

	render(){
		const { user } = this.props;
		return (
			<div className='container'>
				<h1> HARQ Store </h1>
					<div className="container pull-right">
							<ul className="nav navbar-nav">
								<li>
									<NavLink to="/" activeClassName="active">Home</NavLink>
								</li>
								<li>
									<NavLink to="/login" activeClassName="active">Login/Logout</NavLink>
								</li>
								{
									this.props.user.id &&
									<li>
										<NavLink to="/history" activeClassName="active">Order History</NavLink>
									</li>
								}

								{
									user.admin && (<li>
										<NavLink to="/admin" activeClassName="active">Admin</NavLink>
									</li>)
								}

								{
									!user.id && (
										<li>
											<NavLink to="/signup" activeClassName="active">Signup</NavLink>
										</li>
									)
								}
							</ul>
					</div>
					<div className="row">
						<Route exact path='/' component={ProductSearch} />
						<Route exact path='/' component={Cart} />
					</div>
				<Route exact path='/products/:productId' component={Product} />
				<Route path='/login' component={Login} />
				<Route path='/history' component={ProductHistory} />
				<Route path='/signup' component={Signup} />
				<Route path='/admin' component={Admin} />
			</div>
		)
	}
}

// export default Main  // This is only commented out to set default user


// The following container is needed only to set default user
/* -----------------    CONTAINER     ------------------ */

const mapState = ({user}) => {
  return {
    user
  }
}
const mapDispatch = (dispatch) => {
  return {
    loginUser: function(credential){
      return dispatch(verifyUser(credential));
    },
	getCart : function(id){
		return dispatch(fetchCart(id));
	},
	loadSessionUser: function(){
		return dispatch(loadUser());
	}
  };
};

export default withRouter(connect(mapState, mapDispatch)(Main));
