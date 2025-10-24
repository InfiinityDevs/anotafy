import {
    Column,
    Entity,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { StatusMesa } from "../Enums/StatusMesa";
import { Unidade } from "./Unidade.entity";
import { Comanda } from "./Comanda.entity";

@Entity("mesa")
export class Mesa {
    @PrimaryGeneratedColumn()
    Id!: number;

    @Column({ type: "varchar", nullable: false, length: 20 })
    Identificacao!: String;

    @Column({ type: "int", nullable: false })
    Capacidade!: number;

    @Column({ type: "enum", nullable: false, enum: StatusMesa })
    Status!: StatusMesa;

    @ManyToMany(() => Unidade, (unidade) => unidade.Mesas)
    Unidade?: Unidade;

    @OneToMany(() => Comanda, (comanda) => comanda.Mesa)
    Comandas?: Comanda[];
}
