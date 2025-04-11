/**
 * Generates documentation from our wokflows
 * expects yamljs to be installed
 * `npm i yamljs -g`
 *
 * run: `node documentWorkflows.js`
 */

// const YAML = require('yamljs');
const fs = require("fs");
const { execSync } = require("child_process");

const dir = "./.github/workflows";
const files = fs.readdirSync(dir)
files.forEach(processFile);

function processFile(file) {
   const buffer = execSync(`yaml2json ${dir}/${file}`);
   const content = JSON.parse(buffer)
   let doc = `\n### [${content.name}](${dir}/${file})
${getDescriptionFromComments(file)}
**Trigger:** ${Object.keys(content.on)[0]}`

   if (content.on.workflow_call?.inputs) {
      doc += "\n#### Inputs\n|Name|Description|Type|Required|\n|---|---|---|---|"
      Object.keys(content.on.workflow_call.inputs).forEach(i => {
         let { description, required, type } = content.on.workflow_call.inputs[i];
         doc += `\n|${i}|${description ?? ""}|${type}|${required ? "✔" : ""}|`;
      });
   }

   if (content.on.workflow_call?.secrets) {
      doc += "\n #### Secrets\n|Name|Description|\n|---|---|"
      Object.keys(content.on.workflow_call.secrets).forEach(s => {
         let { description } = content.on.workflow_call.secrets[s];
         doc += `\n|${s}|${description ?? ""}|`;
      });
   }

   if (content.on.workflow_call?.outputs) {
      doc += "\n #### Outputs\n|Name|Description|\n|---|---|"
      Object.keys(content.on.workflow_call.outputs).forEach(o => {
         let { description } = content.on.workflow_call.outputs[o];
         doc += `\n|${o}|${description ?? ""}|`;
      });
   }

   console.log(doc);
   return doc;

}


function getDescriptionFromComments(file) {
   let text = fs.readFileSync(`${dir}/${file}`, { encoding: "utf8" });
   text = text.split("\n");
   const description = [];
   const comment = /^#\s/;
   // Allow description comment to start on the second line
   if (!comment.test(text[0])) {
      text.shift();
   }
   while (comment.test(text[0])) {
      description.push(text.shift().replace("# ", ""));
   }
   if (description.length == 0) return ""
   return description.join("\n") + "\\";
}
