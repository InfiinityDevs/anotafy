import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { YesNo } from "../enums/YesNo";
import { Unidade } from "./Unidade.entity";
import { ItemComanda } from "./ItemComanda.entity";

@Entity("usuario")
export class Usuario {
    @PrimaryGeneratedColumn()
    Id!: number;

    @Column({ type: "varchar", nullable: false, length: 100 })
    Nome!: string;

    @Column({ type: "enum", nullable: false, enum: YesNo })
    Status!: YesNo;

    @Column({ type: "varchar", nullable: false, length: 100 })
    CodigoIdentificacao!: string;

    @Column({ type: "varchar", nullable: false, length: 100 })
    Login!: string;

    @Column({ type: "varchar", nullable: false, length: 255 })
    Senha!: string;

    @ManyToOne(() => Unidade, (unidade) => unidade.Usuarios)
    Unidade!: Unidade;

    @OneToMany(() => ItemComanda, (itemComanda) => itemComanda.Usuario)
    ItensComanda?: ItemComanda[];
}
