import { withFormik, Form, Field } from "formik";
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
const OnboardForm = ({ values, errors, touched, status }) => {
    const [ person, setPerson ] = useState([]);
    useEffect(() => {
        status && setPerson(person => [...person, status]);
    }, [status]);
    return (
        <div className='onboard-form'>
            <Form>
                <label htmlFor="people">
                    Name:
                    <Field 
                    id="people" 
                    type="text" 
                    name="people" 
                    placeHolder="Enter Name"
                    />
                    {touched.people && errors.people && (
                        <p className="errors">{errors.people}</p>
                    )}
                </label>
                <label>
                    Email:
                    <Field
                    id="email"
                    type="text"
                    name="email"
                    placeHolder="Enter Email"
                    />
                    {touched.email && errors.email && (
                        <p className="errors">{errors.email}</p>
                    )}
                </label>
                <label htmlFor="password">
                    Password:
                    <Field
                    id="password"
                    type="password"
                    name="password"
                    placeHolder="Enter Password"
                    />
                    {touched.password && errors.password && (
                        <p className="errors">{errors.password}</p>
                    )}
                </label>
                <label>
                    Terms of Service:
                    <Field
                    type="checkbox"
                    name="tos"
                    checked={values.tos}
                    />
                </label>
                <button type="submit">Submit</button>
            </Form>
            {person.map(persons => {
                return (
                   <ul key={persons.id}>
                       <li>Name: {persons.people}</li>
                       <li>Email: {persons.email}</li>
                   </ul>     
                )
            })}
        </div>
    );
};
const FormikOnboardForm = withFormik ({
    mapPropsToValues(props) {
        return {
            people: props.people || "",
            email: props.email || "",
            password: props.password || "",
            tos: props.tos || false,
        };
    },
    validationSchema: Yup.object().shape({
        people: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    }),
    handleSubmit( values, { setStatus, resetForm }) {
        axios.post("https://reqres.in/api/users", values)
        .then ( response => {
            console.log('Success', response);
            setStatus(response.data);
            resetForm();
        })
        .catch ( err => console.log(err.response));
    }
})(OnboardForm);
export default FormikOnboardForm;