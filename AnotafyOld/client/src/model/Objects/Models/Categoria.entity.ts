import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { Unidade } from "./Unidade.entity";
import { Produto } from "./Produto.entity";

@Entity("categoria")
export class Categoria {
    @PrimaryGeneratedColumn({ name: "id_categoria" })
    Id!: number;

    @Column({ name: "nome", type: "varchar", nullable: false, length: 100 })
    Nome!: string;

    @Column({ name: "descricao", type: "varchar", nullable: true, length: 500 })
    Descricao!: string;

    @ManyToOne(() => Unidade, (unidade) => unidade.Categorias, { nullable: false })
    @JoinColumn({ name: "id_unidade" })
    Unidade?: Unidade;

    @OneToMany(() => Produto, (produto) => produto.Categoria)
    Produtos?: Produto[];
}
