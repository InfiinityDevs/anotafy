import app from './app';
import { AppDataSource } from './data-source';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
	.then(() => {
		console.log('✅ Fonte de dados inicializada com sucesso!');

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
