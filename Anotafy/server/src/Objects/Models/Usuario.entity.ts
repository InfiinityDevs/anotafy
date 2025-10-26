import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { YesNo } from "../Enums/YesNo";
import { Unidade } from "./Unidade.entity";
import { ItemComanda } from "./ItemComanda.entity";
import { TipoUsuario } from "../Enums/TipoUsuario";

@Entity("usuario")
export class Usuario {
    @PrimaryGeneratedColumn({ name: "id_usuario" })
    Id!: number;

    @Column({ name: "nome", type: "varchar", nullable: false, length: 100 })
    Nome!: string;

    @Column({ name: "status", type: "enum", nullable: false, enum: YesNo })
    Status!: YesNo;

    @Column({
        name: "tipo_usuario",
        type: "enum",
        nullable: false,
        enum: TipoUsuario,
    })
    TipoUsuario!: TipoUsuario;

    @Column({
        name: "codigo_identificacao",
        type: "varchar",
        nullable: false,
        length: 100,
    })
    CodigoIdentificacao!: string;

    @Column({ name: "login", type: "varchar", nullable: false, length: 100 })
    Login!: string;

    @Column({ name: "senha", type: "varchar", nullable: false, length: 255 })
    Senha!: string;

    @ManyToOne(() => Unidade, (unidade) => unidade.Usuarios, { nullable: false })
    @JoinColumn({ name: "id_unidade" })
    Unidade!: Unidade;

    @OneToMany(() => ItemComanda, (itemComanda) => itemComanda.Usuario)
    ItensComanda?: ItemComanda[];
}
