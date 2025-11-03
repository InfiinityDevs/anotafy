import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { StatusMesa } from "../Enums/StatusMesa";
import { Unidade } from "./Unidade.entity";
import { Comanda } from "./Comanda.entity";

@Entity("mesa")
export class Mesa {
    @PrimaryGeneratedColumn({ name: "id_mesa" })
    Id!: number;

    @Column({
        name: "identificacao",
        type: "varchar",
        nullable: false,
        length: 20,
    })
    Identificacao!: string;

    @Column({ name: "capacidade", type: "int", nullable: false })
    Capacidade!: number;

    @Column({ name: "status", type: "enum", nullable: false, enum: StatusMesa })
    Status!: StatusMesa;

    @ManyToOne(() => Unidade, (unidade) => unidade.Mesas, { nullable: false })
    @JoinColumn({ name: "id_unidade" })
    Unidade?: Unidade;

    @OneToMany(() => Comanda, (comanda) => comanda.Mesa)
    Comandas?: Comanda[];
}
