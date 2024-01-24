import { parse } from "yaml";
import { readFileSync } from "fs";

const swaggerConfigFile = readFileSync("./swagger.yaml", "utf-8");
const swaggerDocument = parse(swaggerConfigFile);

export default swaggerDocument;
