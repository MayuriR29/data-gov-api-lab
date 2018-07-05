const app = require("./app");
const PORT = process.env.PORT || 3000;
const swaggerUi=require('swagger-ui-express');
const swaggerDocument=require('./swagger-sample.json');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`your app has started on port ${PORT}...`);
});
