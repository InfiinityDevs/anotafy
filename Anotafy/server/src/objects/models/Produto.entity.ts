import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { YesNo } from '../enums/YesNo';
import { Categoria } from './Categoria.entity';
import { ItemComanda } from './ItemComanda.entity';

@Entity('produto')
export class Produto {
	@PrimaryGeneratedColumn()
	Id!: number;

	@Column({ type: 'varchar', length: 150, nullable: false })
	Nome!: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	Descricao!: string;

	@Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
	Preco!: number;

	@Column({ type: 'enum', nullable: false, enum: YesNo })
	Status!: YesNo;

	@ManyToOne(() => Categoria, (categoria) => categoria.Produtos)
	Categoria!: Categoria;

	@OneToMany(() => ItemComanda, (itemComanda) => itemComanda.Produto)
	ItensComanda?: ItemComanda[];
}
