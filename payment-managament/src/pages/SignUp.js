import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../StateProvider";
import "./css/SignInForm.css";

export default function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" />
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" />
          <label htmlFor="password">password</label>
          <input ref={passwordRef} type="password" id="password" />
          <label htmlFor="passwordConfirmation">password confirmation</label>
          <input
            ref={passwordConfirmRef}
            type="password"
            id="passwordConfirmation"
          />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
        </form>
        <Link to="/login">Already have an account?</Link>
      </div>
    </div>
  );
}
