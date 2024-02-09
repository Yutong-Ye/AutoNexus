import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CustomerList from './Sales/CustomerList';
import CustomerForm from './Sales/CustomerForm';
import SalesPeopleList from './Sales/SalesPeopleList';
import SalesPersonForm from './Sales/SalesPersonForm';
import SalesList from './Sales/SalesList';
import SaleForm from './Sales/SaleForm';
import ManufacturerList from './Inventory/ManufacturerList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import VehicleModelList from './Inventory/VehicleModelList';
import VehicleModelForm from './Inventory/VehicleModelForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/api/customers/" element={<CustomerList />} />
          <Route path="/api/customers/new/" element={<CustomerForm />} />
          <Route path="/api/salespeople/" element={<SalesPeopleList />} />
          <Route path="/api/salespeople/new/" element={<SalesPersonForm />} />
          <Route path="/api/sales/" element={<SalesList />} />
          <Route path="/api/sales/new" element={<SaleForm />} />
          <Route path="/api/manufacturers/" element={<ManufacturerList />}/>
          <Route path="/api/manufacturers/new/" element={<ManufacturerForm />} />
          <Route path="/api/models/" element={<VehicleModelList />} />
          <Route path="/api/models/new/" element={<VehicleModelForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
