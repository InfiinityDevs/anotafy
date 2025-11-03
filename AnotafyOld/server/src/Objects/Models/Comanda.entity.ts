import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { StatusComanda } from "../Enums/StatusComanda";
import { ItemComanda } from "./ItemComanda.entity";
import { Mesa } from "./Mesa.entity";

@Entity("comanda")
export class Comanda {
    @PrimaryGeneratedColumn({ name: "id_comanda" })
    Id!: number;

    @Column({ name: "pessoas", type: "int", nullable: true })
    Pessoas?: number;

    @Column({
        name: "hora_abertura",
        type: "timestamp with time zone",
        nullable: false,
    })
    HoraAbertura!: Date;

    @Column({
        name: "hora_fechamento",
        type: "timestamp with time zone",
        nullable: true,
    })
    HoraFechamento!: Date;

    @Column({
        name: "status",
        type: "enum",
        nullable: false,
        enum: StatusComanda,
    })
    Status!: StatusComanda;

    @Column({
        name: "total",
        type: "decimal",
        nullable: false,
        precision: 10,
        scale: 2,
    })
    Total!: number;

    @ManyToOne(() => Mesa, (mesa) => mesa.Comandas, { nullable: false })
    @JoinColumn({ name: "id_mesa" })
    Mesa!: Mesa;

    @OneToMany(() => ItemComanda, (itensComanda) => itensComanda.Comanda)
    ItensComanda?: ItemComanda[];
}
