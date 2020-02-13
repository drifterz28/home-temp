module.exports = {
    "up": "CREATE TABLE IF NOT EXISTS temps (id SERIAL PRIMARY KEY, ip VARCHAR(16), temp smallint, hum smallint, airQuality smallint, timestamp TIMESTAMP)",
    "down": "DROP TABEL temps"
}