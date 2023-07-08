import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { Product } from '../components/Product'
import {Cart} from  '../components/Cart'
import { NotFound } from '../components/NotFound'
import Productdescription from '../components/Productdescription'
import {Provider} from 'react-redux'
import store from '../store/store'

export const AppRouter =()=>{
    return(
        <Provider store={store}>
            
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                <Route exact path='/' element={<Product/>}></Route>
                <Route path='cart' element={<Cart/>}></Route>
                <Route path='product' element={<Productdescription/>}/>
                <Route path='*' element={<NotFound/>}></Route>
                </Route>
            </Routes>
        </Router>
        </Provider>
    )
}