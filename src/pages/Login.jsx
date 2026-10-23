
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    const savedUser = JSON.parse(
      localStorage.getItem("travel-user") || "null"
    );

    if (
      savedUser &&
      savedUser.email === email.trim() &&
      savedUser.password === password
    ) {
      localStorage.setItem("travel-logged-in", "true");
      navigate("/");
    } else {
      setError("Invalid email or password. Please register first.");
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Welcome Back!</h1>
        <p>Login to continue your travel journey.</p>

        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {error && <p className="auth-error" role="alert">{error}</p>}

        <button type="submit">Login</button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <Link to="/">Back to Home</Link>
      </form>
    </main>
  );
}
