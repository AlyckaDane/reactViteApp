import "./SportsForm.css";
import React, { useState } from "react";

const SportsForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        experience: "",
        email: "",
        sports: ""
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.sports) {
            alert("Please select a sport before submitting!");
            return;
        }
    
        try {
            const response = await fetch(
                "https://rogelmartialarts-debfaeahb7ajakdv.southeastasia-01.azurewebsites.net/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
    
            if (response.ok) {
                const result = await response.json();
                alert("Form is submitted successfully");
                console.log("API Response: ", result);
            } else {
                const errorText = await response.text();
                console.error("API Error: ", response.status, errorText);
                alert(`Error submitting form: ${response.statusText}`);
            }
        } catch (error) {
            alert("An error occurred while submitting the form.");
            console.error("Error ", error);
        }
    };
    

      
    return (
        <div className="form-container">
            {!submitted ? (
                <div className="form-card">
                    <h1>Sports Form for MMA</h1>
                    <p>Fill out the details if you're interested</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-field">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                placeholder="Enter your age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="experience">Experience</label>
                            <input
                                type="number"
                                id="experience"
                                name="experience"
                                placeholder="Years of experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        

                        <div className="form-field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="sports">Sports</label>
                            <select
                                id="sports"
                                name="sports"
                                value={formData.sports}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select your sport</option>
                                <option value="Boxing">Boxing</option>
                                <option value="Jujitsu">Jujitsu</option>
                                <option value="Judo">Judo</option>
                                <option value="MuayThai">Muay Thai</option>
                                <option value="Kickboxing">Kickboxing</option>
                                <option value="Karate">Karate</option>
                                <option value="Taekwondo">Taekwondo</option>
                                <option value="CombatSambo">Combat Sambo</option>
                            </select>
                        </div>

                        <button type="submit" className="Submit-btn">
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <div className="confirmation-card">
                    <h1>Thank You, {formData.name}!</h1>
                    <p>Your details have been successfully submitted.</p>
                    <p>
                        <strong>Your Informations:</strong> <br />
                        Name: {formData.name},<br />
                        Age: {formData.age},<br />
                        Email: {formData.email},<br />
                        Sport: {formData.sports}.
                    </p>
                    
                    <h3>Camp Address:</h3>
                    <p>222 Khabib  MMA Training Camp, Chimaev St, Makhachev City</p>
                    <h3>Training Schedule: </h3>
                    <p>Monday to Friday, 4:00 PM - 8:00 PM</p>
                    <p>Kindly check your email ({formData.email}) for further details.</p>
                    <h2>Welcome to the MMA Community, {formData.name}!</h2>
                    <p>Get ready to take your passion for {formData.sports} to the next level!</p>
                </div>
            )}
        </div>
    );
};

export default SportsForm;