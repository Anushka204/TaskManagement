import { useEffect, useState } from "react"

const Success = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Extract the token from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const tokenFromUrl = urlParams.get("token")

    if (tokenFromUrl) {
      setToken(tokenFromUrl)
      localStorage.setItem("token", tokenFromUrl)

      // Decode token to get user details (basic decoding, not secure for sensitive data)
      const decodedToken = JSON.parse(atob(tokenFromUrl.split(".")[1]))
      setUser(decodedToken)
    }
  }, [])

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Authentication Successful</h1>
      {user ? (
        <>
          <p>
            Welcome, <strong>{user.email}</strong>!
          </p>
          <p>
            Username: <strong>{user.username || "N/A"}</strong>
          </p>
          <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt='Profile'
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
        </>
      ) : (
        <p>Loading user information...</p>
      )}
      <button
        onClick={() => localStorage.removeItem("token")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  )
}

export default Success
