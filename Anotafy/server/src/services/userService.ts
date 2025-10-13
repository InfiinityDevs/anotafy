import { AppDataSource } from '../data-source';
import { User } from '../objects/models/User.entity';

// Obtém o repositório da entidade User. O repositório é o principal
// meio de comunicação com a tabela do banco de dados.
const userRepository = AppDataSource.getRepository(User);

export const getAllUsers = async (): Promise<User[]> => {
	return userRepository.find();
};

export const getUserById = async (id: number): Promise<User> => {
	const user = await userRepository.findOneBy({ id: id });
	if (!user) {
		throw new Error('Usuário não encontrado');
	}
	return user;
};

type CreateUserData = Omit<User, 'id'>;

export const createUser = async (data: CreateUserData): Promise<User> => {
	if (!data.name || !data.email) {
		throw new Error('Nome e email são obrigatórios');
	}
	// Cria uma nova instância da entidade User
	const newUser = userRepository.create(data);
	// Salva a nova entidade no banco de dados
	await userRepository.save(newUser);
	return newUser;
};
