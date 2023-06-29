import React, { useEffect, useState} from "react";
import * as yup from "yup";
import { useFormik } from "formik";

function Home() {

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
    rank: yup.number().positive().integer().typeError("Please enter a").max(10)
  });


  const formik = useFormik({
    initialValues: {
      name: "",
      rank: ""
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

            <label htmlFor="age">rank</label>
            <br />

            <input
            id="rank"
            name="rank"
            onChange={formik.handleChange}
            value={formik.values.rank}
            />
            <p style={{ color: "red" }}> {formik.errors.rank}</p>
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

export default Home;