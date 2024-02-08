import { useEffect, useState } from 'react';

function SalesbySalespersonList() {
    const [salespeople, setSalespeople] = useState([]);
    const [selectedSalesperson, setSelectedSalesperson] = useState(null);
    const [sales, setSales] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/salespeople/');

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salesperson);
        }
    };

    const getSalesBySalesperson = async () => {
        if (selectedSalesperson) {
            const response = await fetch(`http://localhost:8090/api/salesbysalesperson/${selectedSalesperson.id}`);

            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            }
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getSalesBySalesperson();
    }, [selectedSalesperson]);

    const handleSalespersonChange = (event) => {
        const selectedId = parseInt(event.target.value, 10);
        const selectedSalesperson = salespeople.find((sp) => sp.id === selectedId);
        setSelectedSalesperson(selectedSalesperson);
    };

    return (
        <div>
            <h1>Sales by Salesperson</h1>
            <div>
                <label htmlFor="salespersonDropdown">Select Salesperson: </label>
                <select
                    id="salespersonDropdown"
                    onChange={handleSalespersonChange}
                    value={selectedSalesperson ? selectedSalesperson.id : ''}
                >
                    <option value="" disabled>Select a salesperson</option>
                    {salespeople.map((salesperson) => (
                        <option key={salesperson.id} value={salesperson.id}>
                            {`${salesperson.first_name} ${salesperson.last_name} (${salesperson.employee_id})`}
                        </option>
                    ))}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Automobile VIN</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.price}</td>
                            <td>{sale.automobile}</td>
                            {/* Add more columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesbySalespersonList;
