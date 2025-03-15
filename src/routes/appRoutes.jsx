

import React from "react";
import { Route, Routes } from "react-router-dom";
import {  AddUserDriver } from "../pages/addUserDriver";
import { AddUserSales } from "../pages/addUserSales";
import { AddUserCustomers } from "../pages/addUserCustomer";
import { AddUserAccounts } from "../pages/addUserAccounts";
import { AddUserDriverform } from "../pages/addUserDriverForm";
import { AddUserSalesform } from "../pages/addUserSalesForm";
import { AddUserAccountsform } from "../pages/addUserAccountsForm";
import { AddUserCustomerform } from "../pages/addUserCustomerForm";
import { AddProductForm } from "../pages/addForm";
import { AddUser } from "../pages/addUser";
import { StockManagement } from "../pages/stockManagement";
import { ProductList } from "../pages/productLIst";
import { ProductListForView } from "../pages/productLIstForView";
import { Products } from "../pages/products";
import {  Drivers } from "../pages/drivers";
import { Orders } from "../pages/orders";
import { ViewProducts } from "../pages/viewProducts";
import { ViewProductsDelivered } from "../pages/viewProductsDelivered";
import { ViewProductsPending } from "../pages/viewProductsPending";
import { ViewProductsCanceled } from "../pages/viewProductsCanceled";
import { Wallet } from "../pages/wallet";
import { RecurringOrder } from "../pages/reccuringOrder";
import { RecurringOrderView } from "../pages/recurringOrder";
import { OrderAssigned } from "../pages/orderAssigned";
import { Dashboard } from "../pages/dashboard";
import { Login } from "../pages/login";
import { DriversList } from "../pages/driversList";


const AppRouter = () => {


  
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={<Dashboard/>} />
      <Route path="/adduser-driver" element={<AddUserDriver/>} />
      <Route path="/adduser-sales" element={<AddUserSales/>} />
      <Route path="/adduser-customers" element={<AddUserCustomers/>} />
      <Route path="/adduser-accounts" element={<AddUserAccounts/>} />
      <Route path="/adduser-driver-form" element={<AddUserDriverform/>} />
      <Route path="/adduser-sales-form" element={<AddUserSalesform/>} />
      <Route path="/adduser-accounts-form" element={<AddUserAccountsform/>} />
      <Route path="/adduser-customer-form" element={<AddUserCustomerform/>} />
      <Route path="/add-product-form" element={<AddProductForm/>} />
      <Route path="/add-user" element={<AddUser/>} />

      <Route path="/stockManagement" element={<StockManagement/>} />
      <Route path="/productList" element={<ProductList/>} />
      <Route path="/productList-view" element={<ProductListForView/>} />
      <Route path="/products" element={<Products/>} />
      <Route path="/drivers" element={<Drivers/>} />
      <Route path="/drivers-list" element={<DriversList/>} />
      <Route path="/orders" element={<Orders/>} />
     
      <Route path="/view-product" element={<ViewProducts/>} />
      <Route path="/view-product-delivered" element={<ViewProductsDelivered/>} />
      <Route path="/view-product-pending" element={<ViewProductsPending/>} />
      <Route path="/view-product-canceled" element={<ViewProductsCanceled/>} />

      <Route path="/wallet" element={<Wallet/>} />
      <Route path="/recurring-order" element={<RecurringOrder/>} />
      <Route path="/recurring-order-view" element={<RecurringOrderView/>} />
      <Route path="/order-assigned" element={<OrderAssigned/>} />

    </Routes>
  );
};

export default AppRouter;