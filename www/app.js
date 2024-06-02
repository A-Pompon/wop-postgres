const { app } = require("../server");
const PORT = 4000;
const models = require("../config/models");

models.initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
