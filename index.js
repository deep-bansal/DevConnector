const express = require("express");
const db = require("./config/mongoose");
const app = express();
const port = process.env.PORT || 5000;
db();
app.get("/", (req, res) => {
  res.send("API running");
});

app.use("/api/v1/users", require("./routes/api/v1/users"));
app.use("/api/v1/profile", require("./routes/api/v1/profile"));
app.use("/api/v1/post", require("./routes/api/v1/post"));
app.use("/api/v1/auth", require("./routes/api/v1/auth"));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
