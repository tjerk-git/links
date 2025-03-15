import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { saveLink, getLinks } from './database.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use(cors({
    origin: 'chrome-extension://clpbdghjbemhhaklfhaddfdgkbkcageg'
}));
app.use(express.json());
// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
const PORT = 3000;
// Redirect root to links page
app.get('/', (req, res) => {
    res.redirect('/links');
});
// POST endpoint to add a new link
app.post('/links/add', (req, res) => {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }
    saveLink(url);
    res.json({ message: 'Link saved successfully' });
});
// GET endpoint to retrieve all links
app.get('/links', async (req, res) => {
    getLinks((links) => {
        var _a;
        if ((_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.includes('text/html')) {
            res.render('home', { links });
        }
        else {
            res.json(links);
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
