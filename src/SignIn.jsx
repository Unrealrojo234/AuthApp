import { useEffect, useState } from "react";
import Loader from "./Loader";
import Success from "./Popups/Success";
import "./Loader.css";
import Error from "./Popups/Error";

//API URL
const api = import.meta.env.VITE_REACT_API_DET;

export default function SignIn() {
  const [regNo, setRegNo] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]); //Storing all users from db
  const [signIn, setSignIn] = useState(false);

  //clearing fields after successful sign in
  const clear = () => {
    setRegNo((regNo) => "");
    setPassword((password) => "");
  };

  useEffect(() => {
    //Deactivating loader on page load
    $(".loader").addClass("invisible");

    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setUsers((users) => data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  //Function for success popup alert
  const popSuccess = () => {
    //Making popup visible on success
    $(".success").addClass("visible");

    //Deactivating loader on success
    $(".loader").addClass("invisible");

    setTimeout(() => {
      //Removes popup after 3s
      $(".success").removeClass("visible");
      clear(); //clears the input fields
    }, 3000);
  };

  //Function for success popup alert
  const popError = () => {
    //Making popup visible on success
    $(".error").addClass("visible");

    //Deactivating loader on success
    $(".loader").addClass("invisible");

    setTimeout(() => {
      //Removes popup after 3s
      $(".error").removeClass("visible");
      clear(); //clears the input fields
    }, 3000);
  };

  const handleRegNum = (e) => {
    setRegNo((regNo) => e.target.value);
  };

  const handlePassword = (e) => {
    setPassword((password) => e.target.value);
  };

  const handleSignIn = (e) => {
    //Activating loader on page load
    $(".loader").removeClass("invisible");
    e.preventDefault();

    users.filter((data) => {
      //Checks for details in database
      if (data.regNum.includes(regNo) && data.password.includes(password)) {
        setSignIn((signIn) => true);
      }
    });

    //Very important for proper functionality
    //Please do not touch this, it's for your own good!!!
    setTimeout(() => {
      //Check id signIn is still false and display error
      if (signIn === false) {
        console.log("Error Signing in");
        popError();
      } else {
        console.log("Successfully signed in!");
        popSuccess();
      }
    }, 3000);
  };

  return (
    <div className="container-fluid position-relative">
      <h1 className="text-center">Sign In?</h1>
      <form
        action="submit"
        className="form-control"
        onSubmit={handleSignIn}
        style={{ maxWidth: "32rem", display: "block", margin: "auto" }}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Reg No. e.g IN16/*****/**"
          value={regNo}
          onChange={handleRegNum}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          onChange={handlePassword}
          required
        />
        <br />
        <div
          className="row container-fluid"
          style={{ display: "block", margin: "auto" }}
        >
          <button type="submit" className="btn btn-primary">
            Sign In <Loader />
          </button>
        </div>
      </form>
      <Success type="Signed In" />
      <Error type="Signing in" />
    </div>
  );
}
