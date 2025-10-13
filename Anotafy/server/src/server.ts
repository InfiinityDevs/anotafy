import app from './app';
import { AppDataSource } from './data-source';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
	.then(() => {
		console.log('✅ Fonte de dados inicializada com sucesso!');

		// Inicia o servidor Express APÓS a conexão com o banco ser estabelecida
		app.listen(PORT, () => {
			console.log(`🚀 Servidor TS rodando na porta ${PORT}`);
		});
	})
	.catch((error) =>
		console.error(
			'❌ Erro durante a inicialização da fonte de dados',
			error
		)
	);
