import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { YesNo } from "../Enums/YesNo";
import { Categoria } from "./Categoria.entity";
import { ItemComanda } from "./ItemComanda.entity";

@Entity("produto")
export class Produto {
    @PrimaryGeneratedColumn({ name: "id_produto" })
    Id!: number;

    @Column({ name: "nome", type: "varchar", length: 150, nullable: false })
    Nome!: string;

    @Column({ name: "descricao", type: "varchar", length: 255, nullable: true })
    Descricao!: string;

    @Column({
        name: "preco",
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false,
    })
    Preco!: number;

    @Column({ name: "status", type: "enum", nullable: false, enum: YesNo })
    Status!: YesNo;

    @ManyToOne(() => Categoria, (categoria) => categoria.Produtos, { nullable: false })
    @JoinColumn({ name: "id_categoria" })
    Categoria!: Categoria;

    @OneToMany(() => ItemComanda, (itemComanda) => itemComanda.Produto)
    ItensComanda?: ItemComanda[];
}
