import pool  from "../db.js";

export const createUser = async (username, hashedPassword) => {
    const result = await pool.query(
        "INSERT INTO auth (user_name, password) VALUES ($1, $2) RETURNING *",
        [username, hashedPassword]
    );
    return result.rows[0];
};

export const findUserByUsername = async (username) => {
    const result = await pool.query("SELECT * FROM auth WHERE user_name = $1", [username]);
    return result.rows[0];
};
