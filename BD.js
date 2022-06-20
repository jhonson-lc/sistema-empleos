const express = require("express");
const a = express();
a.use(express.json());
a.listen(3000, () => {
  console.log("aplicacion en ejecucion");
});
