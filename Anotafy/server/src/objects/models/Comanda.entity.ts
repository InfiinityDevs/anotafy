import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { StatusComanda } from '../enums/StatusComanda';
import { ItemComanda } from './ItemComanda.entity';
import { Mesa } from './Mesa.entity';

@Entity('comanda')
export class Comanda {
	@PrimaryGeneratedColumn()
	Id!: number;

	@Column({ type: 'timestamp with time zone', nullable: false })
	HoraAbertura!: Date;

	@Column({ type: 'timestamp with time zone', nullable: false })
	HoraFechamento!: Date;

	@Column({ type: 'enum', nullable: false, enum: StatusComanda })
	Status!: StatusComanda;

	@ManyToOne(() => Mesa, (mesa) => mesa.Comandas)
	Mesa!: Mesa;

	@OneToMany(() => ItemComanda, (itensComanda) => itensComanda.Comanda)
	ItensComanda?: ItemComanda[];
}
