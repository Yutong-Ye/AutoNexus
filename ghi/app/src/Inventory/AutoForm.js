import { useEffect, useState } from 'react';

function AutomobileForm() {
    const [models, setModels] = useState([]);
    const [color, setColor] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [modelId, setModelId] = useState('');
    const [submittedAuto, setSubmittedAuto] = useState(false);

    const getData = async () => {
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setModels(data.models)
        }
    }
    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const autoData = {};
        autoData.color = color;
        autoData.year = year;
        autoData.vin = vin;
        autoData.model_id = modelId;

        const autoUrl = "http://localhost:8100/api/automobiles/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(autoData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const autoResponse = await fetch(autoUrl, fetchConfig);
        if (autoResponse.ok) {
            setColor('');
            setYear('');
            setVin('');
            setModelId('');
        }
        setSubmittedAuto(true);
    }

    const handleColorChange = (e) => {
        const value = e.target.value;
        setColor(value);
    }
    const handleYearChange = (e) => {
        const value = e.target.value;
        setYear(value);
    }
    const handleVinChange = (e) => {
        const value = e.target.value;
        setVin(value);
    }
    const handleModelChange = (e) => {
        const value = e.target.value;
        setModelId(value);
    }

    const formClasses = (!submittedAuto) ? '' : 'd-none';
    const messageClasses = (!submittedAuto) ? 'alert alert-success d-none mb-0' : 'alert alert-success mb-0';


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add an automobile to inventory</h1>
                    <form className={formClasses} onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                            <label htmlFor="color">Color...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleYearChange} value={year} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                            <label htmlFor="year">Year...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleVinChange} value={vin} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                            <label htmlFor="color">Vin...</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleModelChange} value={modelId} required name="model" id="model" className="form-select">
                                <option value="">Choose a model...</option>
                                {models.map(model => {
                                    return (
                                        <option 
                                        key={model.id} value={model.id}>
                                        {model.name}
                                        </option>
                                    )
                                })};
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className={messageClasses} id="success-message">
                        You have added an Automobile to the inventory!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm;

