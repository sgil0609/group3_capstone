import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await response.json();
      setMessage(result.msg);
      if (!response.ok) {
        throw result;
      }
      setMessage("Login successful!");
      
      localStorage.setItem("token", result.token)
      
      // console.log("token equals", result.token);

      setUser(result.user);
      setLoggedIn(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="login">
      <h2>{isLoggedIn ? "" : "Login"}</h2>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="button">Logout</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
      <p>{message}</p>
    </div>
  );
};

export default Login;