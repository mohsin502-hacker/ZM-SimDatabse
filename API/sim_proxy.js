const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/sim_proxy", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    const number = req.query.num;

    if (!number) {
        return res.json({ error: "Phone number is required" });
    }

    const api_url = `https://fam-official.serv00.net/sim/api.php?num=${encodeURIComponent(number)}`;

    try {
        const response = await fetch(api_url);
        const apiData = await response.json();
        res.json(apiData);
    } catch (error) {
        res.json({ error: "API request failed" });
    }
});

// Export handler for Vercel
module.exports = app;
