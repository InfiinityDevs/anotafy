import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatusEmpresa } from '../enums/StatusEmpresa';
import { Unidade } from './Unidade.entity';

@Entity('empresa')
export class Empresa {
	@PrimaryGeneratedColumn()
	Id?: number;

	@Column({ type: 'varchar', length: 100, nullable: false })
	RazaoSocial!: string;

	@Column({ type: 'varchar', length: 150, nullable: false })
	NomeFantasia!: string;

	@Column({ type: 'varchar', length: 14, nullable: false })
	CnpjRaiz?: string;

	@Column({ type: 'date', nullable: true })
	DataFundacao!: Date;

	@Column({ type: 'varchar', length: 7, nullable: true })
	CnaePrincipal!: string;

	@Column({ type: 'varchar', length: 11, nullable: true })
	TelefonePrincipal!: string;

	@Column({ type: 'varchar', length: 200, nullable: true })
	EmailPrincipal!: string;

	@Column({ type: 'varchar', length: 200, nullable: true })
	Website?: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	LogoUrl?: string;

	@Column({ type: 'enum', enum: StatusEmpresa, nullable: false })
	Status!: StatusEmpresa;

	@Column({ type: 'timestamp with time zone', nullable: false })
	DataCadastro!: Date;

	@Column({ type: 'timestamp with time zone', nullable: true })
	DataAtualizacao!: Date;

	@OneToMany(() => Unidade, (unidade) => unidade.Empresa)
	Unidades?: Unidade[];
}
