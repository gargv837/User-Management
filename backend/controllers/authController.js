import bcrypt from "bcrypt";
import { createUser, findUserByUsername } from "./userController";
import generateToken from "";

export const register = async (req, res) => {
    const { user_name, password } = req.body;
    const userExists = await findUserByUsername(user_name);

    if(userExists) return res.status(400).json({msg: "User already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(user_name, hashedPassword);

    res.status(201).json({
        id: user.id,
        user_name: user.user_name,
        token: generateToken(user.id),
    });
};
