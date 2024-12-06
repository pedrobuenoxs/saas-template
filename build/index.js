var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
var app = express();
app.use(express.json());
app.use(cors());
// Initialize Supabase client
import { fileURLToPath } from "url";
import { dirname } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var ENV = process.env.NODE_ENV;
console.log({ ENV: ENV });
var buildPath = ENV === "production"
    ? path.join(__dirname, "..", "/build")
    : path.join(__dirname, "..");
var filePath = path.resolve(buildPath, "index.html");
app.get("/", function (req, res) {
    var route = req.path;
    // Fetch metadata from pageConfig
    var metaTags = {
        title: "Quantas calorias tem",
        description: "Descubra quantas calorias tem no seu prato de comida!",
        keywords: [
            "quantas calorias tem",
            "quantas calorias",
            "calorias prato de comida",
        ],
    };
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            return console.error(err);
        }
        var updatedHtml = data
            .replace(/\$OG_TITLE/g, metaTags.title)
            .replace(/\$OG_KEYWORDS/g, metaTags.keywords.join(","))
            .replace(/\$OG_DESCRIPTION/g, metaTags.description)
            .replace(/\$OG_TYPE/g, "website")
            .replace(/\$OG_IMAGE/g, "/icon.svg")
            .replace(/\$OG_URL/g, "https://www.my-pet.website".concat(route));
        res.send(updatedHtml);
    });
});
app.get("/sitemap.xml", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.header("Content-Type", "application/xml");
        }
        catch (err) {
            console.error("Error generating sitemap:", err);
            res.status(500).json({ error: "Internal server error" });
        }
        return [2 /*return*/];
    });
}); });
app.get("/robots.txt", function (req, res) {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /\nSitemap: https://my-pet.website/sitemap.xml");
});
app.use(express.static(buildPath));
// Serve static files
app.get("*", function (req, res) {
    var route = req.path;
    console.log("Route", route);
    // Fetch metadata from pageConfig
    var metaTags = {
        title: "Quantas calorias tem",
        description: "Descubra quantas calorias tem no seu prato de comida!",
        keywords: [
            "quantas calorias tem",
            "quantas calorias",
            "calorias prato de comida",
        ],
    };
    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            return console.error(err);
        }
        var updatedHtml = data
            .replace(/\$OG_TITLE/g, metaTags.title)
            .replace(/\$OG_KEYWORDS/g, metaTags.keywords.join(","))
            .replace(/\$OG_DESCRIPTION/g, metaTags.description)
            .replace(/\$OG_TYPE/g, "website")
            .replace(/\$OG_IMAGE/g, "/icon.svg")
            .replace(/\$OG_URL/g, "https://www.my-pet.website".concat(route));
        res.send(updatedHtml);
    });
});
// Start Server
var PORT = +process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", function () {
    console.log("Server is running at http://localhost:".concat(PORT));
});
