import { useEffect, useState } from "react";
import Loader from "./Loader";
import "./Loader.css";
import Success from "./Popups/Success";
import Error from "./Popups/Error";

//API URL
const api = import.meta.env.VITE_REACT_API_DET;

export default function SignUp() {
  const [name, setName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  //Every single time browser refreshes it calls this react hook!!!
  //DONT TOUCH!!
  useEffect(() => {
    //Making Loader hidden
    $(".loader").addClass("invisible");
  }, []);

  const handleName = (e) => {
    setName((name) => e.target.value);
  };

  const handleRegNo = (e) => {
    setRegNo((regNo) => e.target.value);
  };

  const handleUserName = (e) => {
    setUserName((userName) => e.target.value);
  };

  const handlePassword = (e) => {
    setPassword((password) => e.target.value);
  };

  //Function for clearing the fields
  const clear = () => {
    setName((name) => "");
    setRegNo((regNo) => "");
    setUserName((userName) => "");
    setPassword((password) => "");
  };

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

  //Adding user to the database

  const handleSignUp = (e) => {
    e.preventDefault();
    $(".loader").removeClass("invisible"); //Making loader visible

    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        regNum: regNo,
        userName: userName,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          popError();
        } else {
          popSuccess();
          console.log("Sign-Up successfull!!!");
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        $(".loader").addClass("invisible");
        console.error("Error", error);
      });
  };
  return (
    <div className="container-fluid">
      <div className="signUp">
        <h1 className="text-center">Sign Up?</h1>
        <form
          style={{
            maxWidth: "32rem",
            padding: "18px",
            margin: "auto",
          }}
          onSubmit={handleSignUp}
          action="submit"
          className="form-control"
        >
          <input
            className="form-control"
            placeholder="Full Name e.g John Doe"
            required
            onChange={handleName}
            value={name}
          />
          <br />
          <input
            className="form-control"
            placeholder="REG Num e.g IN16/*****/**"
            required
            onChange={handleRegNo}
            value={regNo}
          />
          <br />
          <input
            className="form-control"
            placeholder="User Name e.g Johnte102"
            required
            onChange={handleUserName}
            value={userName}
          />
          <br />
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            required
            value={password}
            onChange={handlePassword}
          />
          <br />
          <div
            className="row container-fluid"
            style={{ display: "block", margin: "auto" }}
          >
            <button type="submit" className="btn btn-primary">
              Sign-up <Loader />
            </button>
          </div>
          <br />
          <a href="/signIn">Already have an account?</a>
        </form>
      </div>
      <Success type="Sign Up" />
      <Error type="Signing In" />
    </div>
  );
}
