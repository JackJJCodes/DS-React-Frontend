import React from "react";
import "./Form.css";

function Form() {
    const [form, setForm] = React.useState(
        {
            pregnancies:"",
            glucose:"",
            blood_pressure:"",
            skin_thickness:"",
            insulin_level:"",
            bmi:"",
            diabetes_pedigree:"",
            age:""
        }
    );

    const [loading, setLoading] = React.useState(false);
    const [result, setResult] = React.useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // const form_data = new FormData();
        // form_data.append("1", form.pregnancies);
        // form_data.append("2", form.glucose);
        // form_data.append("3", form.blood_pressure);
        // form_data.append("4", form.skin_thickness);
        // form_data.append("5", form.insulin_level);
        // form_data.append("6", form.bmi);
        // form_data.append("7", form.diabetes_pedigree);
        // form_data.append("8", form.age);

        const form_data = {
            '1': form.pregnancies,
            '2': form.glucose,
            '3': form.blood_pressure,
            '4': form.skin_thickness,
            '5': form.insulin_level,
            '6': form.bmi,
            '7': form.diabetes_pedigree,
            '8': form.age
        }

        let headers = new Headers();

        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');

        headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');

        setLoading(true);
        const test_domain = "http://localhost:5000";
        const prod_domain = "https://ds-model-08.herokuapp.com"
        await fetch(
            test_domain+'/predict',
            // prod_domain+'/predict', 
            {
            method: 'POST',
            body: JSON.stringify(form_data),
            headers: headers
        }).then(response => response.json())
        .then(json =>{
            setResult(json);
            setLoading(false);
        })
    };

    const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setForm({ ...form, [name]: value });
   };

    const handleClear = () => {
        setForm({
            pregnancies:"",
            glucose:"",
            blood_pressure:"",
            skin_thickness:"",
            insulin_level:"",
            bmi:"",
            diabetes_pedigree:"",
            age:""
        });
        setResult("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <h4>Diabetes Prediction Model</h4>
            <p>Example to predict probability of diabetes</p>
            <input
                type="number"
                name="pregnancies"
                value={form.pregnancies}
                onChange={onChange}
                placeholder="Number of pregnancies"
                required
            />
            <input
                type="number"
                name="glucose"
                value={form.glucose}
                onChange={onChange}
                placeholder="Glucose Level"
                required
            />
            <input
                type="number"
                name="blood_pressure"
                value={form.blood_pressure}
                onChange={onChange}
                placeholder="Blood Pressure"
                required
            />
            <input
                type="number"
                name="skin_thickness"
                value={form.skin_thickness}
                onChange={onChange}
                placeholder="Skin Thickness"
                required
            />
            <input
                type="number"
                name="insulin_level"
                value={form.insulin_level}
                onChange={onChange}
                placeholder="Insulin Level"
                required
            />
            <input
                type="number"
                value={form.bmi}
                name="bmi"
                onChange={onChange}
                placeholder="Body Mass Index(BMI)"
                required
            />
            <input
                type="number"
                value={form.diabetes_pedigree}
                name="diabetes_pedigree"
                onChange={onChange}
                placeholder="Diabetes Pedigree Function"
                required
            />
            <input
                type="number"
                value={form.age}
                name="age"
                onChange={onChange}
                placeholder="Age"
                required
            />
            <button type="submit" disabled={loading}>{loading ? "Predicting result..." : "Submit Form"}</button>
            {result && <span onClick={handleClear}>Clear Prediction</span>}

         {/* {result && <div dangerouslySetInnerHTML={{ __html: result }} className="result" />} */}
            { result && <div className="result">{result.pred}</div>}
         </form>
    );
}
export default Form;