import React, { useEffect, useState} from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function SignUp() {

    const [users, setUsers] = useState([]);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  useEffect(() => {
    console.log("FETCH! ");
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  console.log(users)

  const formSchema = yup.object().shape({
    name: yup.string().required("Must enter a name").typeError("Please make sure you are only using letters!").max(100),
    age: yup.number().positive().integer().typeError("Please enter a number").max(99),
    
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      age:"",
      email:"",
      password:"",
      rank: 1
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
        console.log(values)
      fetch("users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })
      .then(r => r.json())
      .then(data => console.log(data))
    },
  });

  return (
    <div>
        <h1>Customer sign up form</h1>
        <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="name">Name</label>
            <br />
            <input
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            />
            <p style={{ color: "red" }}> {formik.errors.name}</p>

            <label htmlFor="age">Age</label>
            <br />
            <input
            id="age"
            name="age"
            onChange={formik.handleChange}
            value={formik.values.age}
            />
            <p style={{ color: "red" }}> {formik.errors.age}</p>

            <label htmlFor="email">Email</label>
            <br />
            <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            />
            <p style={{ color: "red" }}> {formik.errors.email}</p>

            <label htmlFor="password">Password</label>
            <br />
            <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>

            <button type="submit">Submit</button>
        </form>
      <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>name</th>
            <th>rank</th>
          </tr>
          {users === "undefined" ? (
            <p>Loading</p>
          ) : (
            users.map((user) => (
                <tr key={users.indexOf(user)}>
                  <td>{user.name}</td>
                  <td>{user.rank}</td>
                </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

}

export default SignUp;