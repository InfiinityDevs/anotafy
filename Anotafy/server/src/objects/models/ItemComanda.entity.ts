import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Comanda } from './Comanda.entity';
import { Produto } from './Produto.entity';
import { Funcionario } from './Funcionario.entity';

@Entity('item_comanda')
export class ItemComanda {
	@PrimaryColumn()
	ComandaId!: number;

	@PrimaryColumn()
	ProdutoId!: number;

	@ManyToOne(() => Comanda, (comanda) => comanda.ItensComanda)
	@JoinColumn({ name: 'ComandaId' })
	Comanda!: Comanda;

	@ManyToOne(() => Produto, (produto) => produto.ItensComanda)
	@JoinColumn({ name: 'ProdutoId' })
	Produto!: Produto;

	@ManyToOne(() => Funcionario, (funcionario) => funcionario.ItensComanda)
	Funcionario!: Funcionario;

	@Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
	PrecoUnitario!: number;

	@Column({ type: 'int', nullable: false })
	Quantidade!: number;

	@Column({ type: 'varchar', nullable: true, length: 255 })
	Observacao?: string;

	@Column({ type: 'timestamp with time zone', nullable: false })
	HoraAdicionado!: Date;

	@Column({ type: 'timestamp with time zone', nullable: false })
	HoraAtualizado!: Date;
}
