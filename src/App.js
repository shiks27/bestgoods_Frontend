import Categories from "./Admin/Categories";
import DisplayallCategories from "./Admin/DisplayallCategories";
import Company from "./Admin/Company";
import DisplayCompany from "./Admin/DisplayCompany";
import SubCategories from "./Admin/SubCategories";
import products from "./Admin/products";
import DisplayProducts from "./Admin/DisplayallProducts";
import {Route,BrowserRouter as Router} from "react-router-dom"
import DisplayallSubCategories from "./Admin/DisplayallSubCategories";
import Colors from "./Admin/Colors";
import Displayallcolors from "./Admin/Displayallcolors";
import Models from "./Admin/models";
import Displayallmodels from "./Admin/displayallmodels";
import FinalProduct from "./Admin/FinalProduct";
import DisplayFinalProduct from "./Admin/DisplayFinalProduct";
import Dashboard from "./Admin/Dashboard";
import AdminLogin from "./Admin/AdminLogin";
import Banner from "./Admin/banner";
import Header from "./UserInterface/Header";
import Home from "./UserInterface/Home";
import DisplayallBanner from "./Admin/DisplayallBanner";
import Displaymorepictures from "./Admin/Displaymorepictures"
import './App.css';
import Footers from "./UserInterface/Footer";
import ProductList from "./UserInterface/ProductList";
import Signin_Page from "./UserInterface/Signin_Page";
import SignUp from "./UserInterface/SignUp";
import ShoppingCartComponent from "./UserInterface/ShoppingCartComponent"; 
import Sidebar from "./UserInterface/Sidebar";
import Subbanner from "./UserInterface/Subbanner";
import ProductView from "./UserInterface/ProductView";
import OrderSummary from "./UserInterface/OrderSummary";
import PaymentGateway from "./UserInterface/PaymentGateway";
import PaymentType from "./UserInterface/PaymentType";
import UserProfile from "./UserInterface/UserProfile";
import Address from "./UserInterface/Addresses";
import UserInformation from "./UserInterface/UserInformation";
import ListSubCategoryfromCategory from "./UserInterface/ListSubCategoryfromCategory";
function App(props) {
  return (
    <div >
      <Router>
        <Route strict props={props.history} component={Categories} path="/categories" />
        <Route strict props={props.history} component={DisplayallCategories} path="/displayallcategories" />
        <Route strict props={props.history} component={SubCategories} path="/subcategories" />
        <Route strict props={props.history} component={DisplayallSubCategories} path="/displayallsubcategories" />
        <Route strict props={props.history} component={Company} path="/company" />
        <Route strict props={props.history} component={DisplayCompany} path="/displaycompany" />
        <Route strict props={props.history} component={products} path="/products" />
        <Route strict props={props.history} component={DisplayProducts} path="/displayallproducts" />
        <Route strict props={props.history} component={Colors} path="/colors" />
        <Route strict props={props.history} component={Displayallcolors} path="/displayallcolors" />
        <Route strict props={props.history} component={Models} path="/models" />
        <Route strict props={props.history} component={Displayallmodels} path="/displayallmodels" />
        <Route strict props={props.history} component={FinalProduct} path="/finalproduct" />
        <Route strict props={props.history} component={DisplayFinalProduct} path="/displayfinalproducts" />
        <Route strict props={props.history} component={Dashboard} path="/dashboard" />
        <Route strict props={props.history} component={AdminLogin} path="/adminlogin" />
        <Route strict props={props.history} component={Banner} path="/banner" />
        <Route strict props={props.history} component={DisplayallBanner} path="/displayallbanner" />
        <Route strict props={props.history} component={Header} path="/header" />
        <Route strict history={props.history} component={Home} path="/home" />
        <Route strict props={props.history} component={Displaymorepictures} path="/displaymorepictures" />
        <Route strict props={props.history} component={Footers} path="/footer" />
        <Route strict history={props.history} component={ProductList} path="/ProductList" />
        <Route strict props={props.history} component={Signin_Page} path="/signin" />
        <Route strict props={props.history} component={SignUp} path="/signup" />
        <Route strict props={props.history} component={ShoppingCartComponent} path="/shoppingcart" />
        <Route strict props={props.history} component={Sidebar} path="/sidebar" />
        <Route strict props={props.history} component={Subbanner} path="/subbanner" />
        <Route strict props={props.history} component={ProductView} path="/productview" />
        <Route strict props={props.history} component={OrderSummary} path="/ordersummary"/>
        <Route strict props={props.history} component={PaymentGateway} path="/paymentgateway"/>
        <Route strict props={props.history} component={PaymentType} path="/paymenttype"/>
        <Route strict props={props.history} component={UserProfile} path="/userprofile"/>
        <Route strict props={props.history} component={Address} path="/addresses"/>
        <Route strict props={props.history} component={UserInformation} path="/userinfo"/>
       <Route strict props={props.history} component={ListSubCategoryfromCategory} path="/listsubcategoryfromcategory"/>
      </Router>
      
    </div>
  );
}

export default App;
