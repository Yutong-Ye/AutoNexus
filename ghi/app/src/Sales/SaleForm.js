import React, {useState, useEffect} from 'react'

function SaleForm() {
    const [autos, setAutomobiles] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])
    const [formData, setFormData] = useState({
        price: '',
        automobile: '',
        salesperson: '',
        customer: ''
    })

    const getData = async () => {
        const autourl = 'http://localhost:8100/api/automobiles/';
        const salespersonurl = 'http://localhost:8090/api/salespeople/';
        const customerurl = 'http://localhost:8090/api/customers/';
        const responses = await Promise.all([fetch(autourl), fetch(salespersonurl), fetch(customerurl)]);
        if (responses.every(response => response.ok)) {
          const [autosData, salespeopleData, customersData] = await Promise.all(responses.map(response => response.json()));
          setAutomobiles(autosData.autos);
          setSalespeople(salespeopleData.salesperson);
          setCustomers(customersData.customer);

        }
      }

      useEffect(() => {
        if (formData.automobile) {
            const index = autos.findIndex(auto => auto.id === formData.automobile);
            if (index !== -1) {
                const newAutos = [...autos]
                newAutos[index].sold = true
                setAutomobiles(newAutos)
            }
        }
        getData();
      }, [formData]);

      const handleSubmit = async (event) => {
        event.preventDefault();

        const saleUrl = 'http://localhost:8090/api/sales/';

        try {
            const selectedAutomobile = autos.find(auto => auto.vin === formData.automobile);
            const selectedSalesperson = salespeople.find(salesperson => salesperson.employee_id === formData.salesperson);
            const selectedCustomer = customers.find(customer => customer.first_name === formData.customer);

            const formDataToSend = {
                price: formData.price,
                automobile: selectedAutomobile ? selectedAutomobile.vin : '',
                salesperson: selectedSalesperson ? selectedSalesperson.employee_id : '',
                customer: selectedCustomer ? selectedCustomer.first_name : '',
            };

            const fetchConfig = {
                method: 'post',
                body: JSON.stringify(formDataToSend),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await fetch(saleUrl, fetchConfig);

            if (response.ok) {
                const automobileUpdateUrl = `http://localhost:8100/api/automobiles/${encodeURIComponent(formDataToSend.automobile)}/`;
                const automobileUpdateConfig = {
                    method: 'put',
                    body: JSON.stringify({ sold: true }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                const updateResponse = await fetch(automobileUpdateUrl, automobileUpdateConfig);

                if (updateResponse.ok) {
                    setFormData({
                        price: '',
                        automobile: '',
                        salesperson: '',
                        customer: '',
                    });

                    getData();
                } else {
                    console.error('Error updating automobile status:', updateResponse.statusText);
                }
            } else {
                console.error('Error submitting sale:', response.statusText);
                const responseBody = await response.json();
                console.error('Response body:', responseBody);
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

    const handleFormChange = (e) => {
        const value = e.target.value
        const inputName = e.target.name
        setFormData({
            ...formData,
            [inputName]: value
        })
    }
    console.log(formData)
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} value={formData.price} placeholder="Price" required type="number" name="price" id="price" className="form-control" />
                            <label htmlFor="name">Price</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="automobile">Automobile VIN</label>
                            <select onChange={handleFormChange} value={formData.automobile} required name="automobile" id="automobile" className="form-select">
                            {autos.map(autos => {
                                return (
                                    <option key={autos.vin} value={autos.vin}>{autos.vin}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="salesperson">Salesperson</label>
                            <select onChange={handleFormChange} value={formData.salesperson} required name="salesperson" id="salesperson" className="form-select">
                            {salespeople.map(salesperson => {
                                return (
                                    <option key={salesperson.employee_id} value={salesperson.employee_id}>{salesperson.employee_id}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customer">Customer</label>
                            <select onChange={handleFormChange} value={formData.customer} required name="customer" id="customer" className="form-select">
                            {customers.map(customer => {
                                return (
                                    <option key={customer.first_name} value={customer.first_name}>{customer.first_name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SaleForm
