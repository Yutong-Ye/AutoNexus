import { useEffect, useState } from 'react';

function TechnicianList () {
    const [techs, setTech] = useState([]);

    const getData = async() => {
        const response = await fetch('http://localhost:8080/api/technicians/');

        if (response.ok) {
            const data = await response.json();
            setTech(data.techs)
        }
    }

    useEffect(()=>{
        getData()
    }, [])

    return (
        <div className="row">
        <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
            <h1>Technicians List</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {techs.map(tech => {
                    const key = tech.id
                    return (
                    <tr key={key}>
                        <td>{ tech.employee_id } </td>
                        <td>{ tech.first_name } </td>
                        <td>{ tech.last_name } </td>
                    </tr>
                    );
                })
            }
            </tbody>
        </table>
        </div>
        </div>
        </div>
    )
}


export default TechnicianList ;
