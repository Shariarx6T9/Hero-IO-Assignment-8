export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",  // Horizontal center
        alignItems: "center",      // Vertical center
        padding: "20px",           // Padding for small screens
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          textAlign: "center",     // Center text
        }}
      >
        <img
        src="/assets/App-Error.png"
          alt="Not Found"
          style={{ width: "100%", maxWidth: "350px", marginBottom: "20px" }}
        />
        <h1>The App you are requesting is not found on our system.</h1>
        <p>Please try searching for another app.</p>
        <button
          style={{
            background: "var(--primary)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "20px",
          }}
          onClick={() => (window.location.href = "/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
