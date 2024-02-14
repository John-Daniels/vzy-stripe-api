// setup support work passing data into the html file
// using handlebars, syntax...

import path from "path";

const templatesDir = path.resolve("public/templates");

export const handlebarOptions = {
  viewEngine: {
    extName: ".html",
    partialsDir: templatesDir,
    defaultLayout: false,
  },
  viewPath: templatesDir,
  extName: ".html",
};
