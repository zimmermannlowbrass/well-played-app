import React, { useEffect, useState} from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function Home() {

    const [users, setUsers] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted

  useEffect(() => {
    console.log("FETCH! ");
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [refreshPage]);

  console.log(users)


  const formik = useFormik({
    initialValues: {
      name: "",
      rank: "",
    },
    validationSchema: null,
    onSubmit: (values) => {
      fetch("users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        
        if (res.status == 201) {
          setRefreshPage(!refreshPage);
        }
      });
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

            <label htmlFor="age">rank</label>
            <br />

            <input
            id="rank"
            name="rank"
            onChange={formik.handleChange}
            value={formik.values.age}
            />
            <p style={{ color: "red" }}> {formik.errors.age}</p>
            <button type="submit">Submit</button>
        </form>
      {/* <table style={{ padding: "15px" }}>
        <tbody>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>age</th>
          </tr>
          {customers === "undefined" ? (
            <p>Loading</p>
          ) : (
            customers.map((customer, i) => (
              <>
                <tr key={i}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.age}</td>
                </tr>
              </>
            ))
          )}
        </tbody>
      </table> */}
    </div>
  );

}

export default Home;