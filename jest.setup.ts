import "reflect-metadata"
import fs from "fs"
import * as container from "./src/presentation/rest/container"

const PUBLIC_FOLDER = "./public"

if (!fs.existsSync(PUBLIC_FOLDER)) {
  fs.mkdirSync(PUBLIC_FOLDER)
}

container.register()
