import 'reflect-metadata';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

const producao: DataSourceOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'neto',
	password: '123456',
	database: 'anotafy',
	entities: [join(__dirname, '**', '*.entity.{ts,js}')],
	synchronize: false,
};

const postgres: DataSourceOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'neto',
	password: '123456',
	database: 'anotafy',
	entities: [join(__dirname, '**', '*.entity.{ts,js}')],
	synchronize: true,
};

const sqlite: DataSourceOptions = {
	type: 'sqlite',
	database: './.db/anotafy.db',
	logging: true,
	entities: [join(__dirname, '**', '*.entity.{ts,js}')],
	synchronize: true,
};

const config: DataSourceOptions = postgres;

export const AppDataSource = new DataSource(config);