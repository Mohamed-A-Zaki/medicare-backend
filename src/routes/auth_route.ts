import express from "express";
import { register } from "../services/auth/register";
import { login } from "../services/auth/login";

const auth_route = express.Router();

auth_route.route("/login").post(login);
auth_route.route("/register").post(register);

export default auth_route;
