import jwt from "jsonwebtoken";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import multer from "multer";
const SECRET = "ghustaba";
export const jwtAuth = function (req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, SECRET);
            // Attach user ID to request headers
            req.headers["userId"] = user.id;
            // Continue to the next middleware
            next();
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (error) {
        // Handle token verification failure
        console.error("JWT verification failed:", error);
        res.sendStatus(403); // Use 403 for forbidden access
    }
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        console.log("filename");
        console.log(req.headers["userId"]);
        console.log("Current working directory:", process.cwd());
        console.log("Current module directory:", __dirname);
        console.log(file);
        cb(null, req.headers["userId"] + "_" + file.originalname);
    },
});
export const upload = multer({ storage: storage });
