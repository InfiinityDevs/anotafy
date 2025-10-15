import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await userService.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};

export const getUserById = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const user = await userService.getUserById(id);
		res.status(200).json(user);
	} catch (error) {
		if (error instanceof Error) {
			res.status(404).json({ message: error.message });
		}
	}
};

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const newUser = await userService.createUser({ name, email });
    res.status(201).json(newUser);
};
