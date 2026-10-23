
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installMessage, setInstallMessage] = useState("");

  const isLoggedIn =
    localStorage.getItem("travel-logged-in") === "true";

  useEffect(() => {
    const handleInstallAvailable = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setInstallMessage("TravelGo installed successfully!");
    };

    window.addEventListener(
      "beforeinstallprompt",
      handleInstallAvailable
    );

    window.addEventListener("appinstalled", handleInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleInstallAvailable
      );
      window.removeEventListener("appinstalled", handleInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!installPrompt) {
      setInstallMessage(
        "Install option is not available yet. Open Chrome menu (⋮) and choose Install page as app."
      );
      return;
    }

    await installPrompt.prompt();
    const result = await installPrompt.userChoice;

    if (result.outcome === "accepted") {
      setInstallMessage("TravelGo installation accepted!");
    } else {
      setInstallMessage("Installation cancelled.");
    }

    setInstallPrompt(null);
  }

  return (
    <main className="hero">
      <nav className="navbar">
        <Link className="brand" to="/">
          TravelGo
        </Link>

        <div className="nav-links">
          <Link to="/packages">Explore Packages</Link>
          <Link to="/booking">My Cart</Link>
          <Link to="/bookings">Booking History</Link>

          {!isLoggedIn ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("travel-logged-in");
                window.location.reload();
              }}
            >
              Logout
            </button>
          )}

          <button
            type="button"
            className="install-app-button"
            onClick={handleInstall}
          >
            ⬇ Install App
          </button>
        </div>
      </nav>

      {installMessage && (
        <p className="install-message" role="status">
          {installMessage}
        </p>
      )}

      <section className="hero-content">
        <p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>

        <h1>
          Discover places.<br />
          Create memories.
        </h1>

        <p>
          Find your perfect holiday with TravelGo travel packages.
        </p>

        <Link className="button" to="/packages">
          Explore Packages
        </Link>

        {!isLoggedIn && (
          <p>
            New to TravelGo?{" "}
            <Link to="/register">Create an account</Link>
          </p>
        )}
      </section>
    </main>
  );
}
