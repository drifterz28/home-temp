module.exports = {
    "up": "CREATE TABLE IF NOT EXISTS rooms (id SERIAL PRIMARY KEY, ip VARCHAR(16), name VARCHAR(16))",
    "down": "DROP TABLE rooms"
}