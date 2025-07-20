import express from 'express';
import openid from 'openid';
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
const STEAM_API_KEY = "A29334E6EE7B34ECEBB9E877EFE2238B"
// Настраиваем OpenID Relying Party
const relyingParty = new openid.RelyingParty(
  'http://localhost:3000/auth/steam/return', // return URL
  null, // realm
  true,  // stateless
  false, // strict mode
  []
);

// Роут для начала аутентификации
app.get('/auth/steam', (req, res) => {
  const steamOpenIdUrl = 'https://steamcommunity.com/openid';

  relyingParty.authenticate(steamOpenIdUrl, false, (error, authUrl) => {
    if (error) {
      return res.send('Authentication failed: ' + error.message);
    }
    if (!authUrl) {
      return res.send('Authentication failed: No auth URL');
    }

    // редиректим юзера на Steam
    res.redirect(authUrl);
  });
});

// Роут для обработки колбэка от Steam
app.get('/auth/steam/return', (req, res) => {
  relyingParty.verifyAssertion(req.url, (error, result) => {
    if (error || !result || !result.authenticated) {
      return res.send('Authentication failed');
    }

    const steamIdMatch = result.claimedIdentifier.match(/\/id\/(\d+)$/) ||
                         result.claimedIdentifier.match(/\/openid\/id\/(\d+)$/);

    const steamId = steamIdMatch ? steamIdMatch[1] : null;

    if (!steamId) {
      return res.send('Cannot extract SteamID');
    }

    console.log('Authenticated SteamID:', steamId);

    // редиректим на фронт с параметром steamId
    const frontendUrl = `http://localhost:5173/user?steamId=${steamId}`;
    res.redirect(frontendUrl);
  });
});

app.get('/profile/:steamId', async (req, res) => {
  const steamId = req.params.steamId;

  const apiUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.response.players || data.response.players.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const player = data.response.players[0];

    return res.json(player);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch profile' });
  }
});
app.get('/inventory/:steamId/:appId/:contextId', async (req, res) => {
  const { steamId, appId, contextId } = req.params;
  const lang = req.query.lang || 'english';
  const count = req.query.count || 1000;

  const url = `https://steamcommunity.com/inventory/${steamId}/${appId}/${contextId}?l=${lang}&count=${count}`;

  console.log("Fetching URL:", url);

  try {
    const response = await fetch(url);
    const raw = await response.text();

    console.log("STATUS:", response.status);
    console.log("STATUS TEXT:", response.statusText);
    console.log("RAW RESPONSE:", raw || "[EMPTY STRING]");

    if (response.status !== 200) {
      return res.status(response.status).json({
        error: `Steam returned HTTP ${response.status}`,
        details: raw
      });
    }

    if (!raw) {
      return res.status(404).json({
        error: "Steam returned empty response"
      });
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      console.log("Not JSON:", raw);
      return res.status(500).json({
        error: "Steam response is not JSON",
        raw
      });
    }

    if (!data || Object.keys(data).length === 0) {
      return res.status(404).json({
        error: "Inventory empty or private"
      });
    }

    if (data.success === false) {
      return res.status(403).json({
        error: "Inventory private or unavailable"
      });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch inventory"
    });
  }
});
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});