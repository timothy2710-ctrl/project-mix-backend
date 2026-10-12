const express = require('express');
const app = express();

// Render weist den Port automatisch zu, lokal wird Port 3000 genutzt
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging-Middleware (zeigt alle Anfragen im Terminal/Render-Log an)
app.use((req, res, next) => {
    console.log(`[Project Mix Backend] ${req.method} ${req.url}`);
    next();
});

// Startseite / Status-Check
app.get('/', (req, res) => {
    res.send('<h1>Project Mix Backend läuft erfolgreich!</h1>');
});

// Discord OAuth2 Callback Endpoint
app.get('/callback', (req, res) => {
    const code = req.query.code;
    console.log('[Auth] Discord OAuth Code erhalten:', code);
    res.send('<h2>Authentifizierung erfolgreich! Du kannst dieses Fenster jetzt schließen.</h2>');
});

// Basic Account-Endpoint für Fortnite
app.get('/account/api/public/account/:accountId', (req, res) => {
    res.json({
        id: req.params.accountId,
        displayName: "ProjectMixUser",
        email: "user@projectmix.local",
        failedLoginAttempts: 0,
        lastLogin: new Date().toISOString(),
        numberOfMFAMethods: 0,
        ageGroup: "UNKNOWN",
        headless: false,
        country: "DE",
        lastName: "User",
        preferredLanguage: "de",
        canUpdateDisplayName: false,
        tfaEnabled: false,
        emailVerified: true,
        minorVerified: false,
        minorStatus: "NOT_MINOR"
    });
});

// Deaktiviert Warnungen / unbenötigte Live-Features beim Start
app.get('/fortnite/api/game/v2/enabled_features', (req, res) => {
    res.json([]);
});

app.listen(PORT, () => {
    console.log(`[Project Mix] Server gestartet auf Port ${PORT}`);
});