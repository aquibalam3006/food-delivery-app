import React from "react";

const Welcome = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>
          Welcome to <span style={styles.brand}>FoodieHub</span>
        </h1>

        <p style={styles.tagline}>
          Delicious food, delivered fast 🚀
        </p>

        <p style={styles.description}>
          Craving something tasty? Explore top restaurants, order your
          favorite meals, and enjoy doorstep delivery anytime, anywhere.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background:
      "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  overlay: {
    textAlign: "center",
    color: "white",
    maxWidth: "700px",
    padding: "20px",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  brand: {
    color: "#ff6b6b",
  },
  tagline: {
    fontSize: "1.5rem",
    marginBottom: "15px",
    fontWeight: "500",
  },
  description: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    color: "#f1f2f6",
  },
};

export default Welcome;