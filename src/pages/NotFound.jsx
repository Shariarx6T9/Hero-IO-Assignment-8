export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img
        src="/assets/App-Error.png"
        alt="App Not Found"
        style={{ maxWidth: 320, marginBottom: 24 }}
      />
      <h2 style={{ marginBottom: 12 }}>
        The App you are requesting is not found on our system.
      </h2>
      <p style={{ marginBottom: 24, color: "#555" }}>
        Please try searching for another app.
      </p>
      <button
        onClick={() => navigate("/")}
        className="btn !bg-purple-600 !text-white hover:!bg-purple-700 transition-colors"
>
       Go Home
      </button>

     </div>
  );
}
