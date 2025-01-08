import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyBVF7fkZfpDfBd8lpIs-s_Qn4uaEHQbv7k");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const fileContent = fs.readFileSync("C:\\Users\\Yash\\Desktop\\web-desktop\\web\\ot2\\sigma.csv", "utf8");
const fileData = fileContent.toString();
let prompt = fileData;
prompt=prompt+" This is a list of threats that were found in a system. Generate a comprehensive report that will be able to help a cyberforensics expert";

const result = await model.generateContent(prompt);
console.log(result.response.text());
fs.writeFileSync("ans.txt", result.response.text(), "utf8");