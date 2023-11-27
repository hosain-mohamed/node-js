import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function createModuleFiles(moduleName) {
  const moduleFolder = path.join(
    __dirname,
    "src",
    "modules",
    moduleName.toLowerCase()
  );
  const datasourceFolder = path.join(moduleFolder, "datasource", "mongo");

  if (!fs.existsSync(moduleFolder)) {
    fs.mkdirSync(moduleFolder, { recursive: true });
    fs.mkdirSync(datasourceFolder, { recursive: true });

    const files = [
      `${moduleName}.controller.js`,
      `${moduleName}.router.js`,
      `${moduleName}.validator.js`,
      `${moduleName}.di.js`,
      `datasource/${moduleName}.repository.js`,
      `datasource/mongo/mongo.${moduleName}.controller.js`,
      `datasource/mongo/${moduleName}.model.js`,
    ];

    files.forEach((file) => {
      fs.writeFileSync(
        path.join(moduleFolder, file),
        `// ${capitalizeFirstLetter(moduleName)} ${file.split(".")[1]}`
      );
    });

    console.log(`Module ${moduleName} created successfully.`);
  } else {
    console.error(`Module ${moduleName} already exists.`);
  }
}

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("Please provide a module name.");
  process.exit(1);
}

createModuleFiles(moduleName);
