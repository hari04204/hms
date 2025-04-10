import React, { useState, useEffect } from "react";

function RegisterPage2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUsername(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleRegister = () => {
    if (!username || !password) {
      setError("Username and password required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username]) {
      setError("Username already exists");
      return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    alert("Registered successfully!");
    setIsRegister(false);
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username] === password) {
      localStorage.setItem("loggedInUser", username);
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>{isRegister ? "Register" : "Login"}</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          {isRegister ? (
            <button onClick={handleRegister}>Register</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          <br />
          <button onClick={() => setIsRegister(!isRegister)} style={{ marginTop: "1rem" }}>
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      )}
    </div>
  );
}

export default RegisterPage2;
