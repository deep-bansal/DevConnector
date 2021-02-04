const express = require("express");
const db = require("./config/mongoose");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
db();

app.use(express.json({ extended: false }));

app.use("/api/v1/users", require("./routes/api/v1/users"));
app.use("/api/v1/profile", require("./routes/api/v1/profile"));
app.use("/api/v1/post", require("./routes/api/v1/post"));
app.use("/api/v1/auth", require("./routes/api/v1/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.solve(__dirname, "client", "build", "index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
