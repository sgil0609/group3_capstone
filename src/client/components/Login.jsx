import React, { useState } from "react";

const Login = ({ setUser, setIsAdmin }) => { // Defining the Login component
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleEmailChange = (e) => { // Function to change email
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => { // Function to change password
    setPassword(e.target.value);
  };

  const login = async () => { // Login handle process
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
      const result = await response.json(); // Parse JSON response
      setMessage(result.msg);
      if (!response.ok) {
        throw result;
      }
      setMessage("Login successful!");
      
      localStorage.setItem("token", result.token) // Store the token and user in local storage
      localStorage.setItem("user", JSON.stringify(result.user));

      setUser(result.user);
      setLoggedIn(true);
      setEmail("");
      setPassword("");

      setIsAdminLoggedIn(result.user && result.user.role === "admin"); // Checking to see if user is admin after login
      setIsAdmin(result.user && result.user.role === "admin");

    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleLogout = () => { // Handle logging out
    localStorage.removeItem("token"); // Remove the token and user from local storage
    localStorage.removeItem("user");

    setUser(null);
    setLoggedIn(false);
    setMessage("");
    setIsAdminLoggedIn(false);
  };

  const handleSubmit = (e) => { // Handle Form submit
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