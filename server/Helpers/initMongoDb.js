const mongoose = require("mongoose");

// mongoose.connect(process.env.DB, () => console.log("connected to db"));
mongoose
  .connect(process.env.DB)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err.message));
mongoose.connection.on("connected", () => {
  console.log("mongoose connected");
});
mongoose.connection.on("error", () => {
  console.log(error.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("mongoose disconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
