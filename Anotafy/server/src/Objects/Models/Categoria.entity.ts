import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Unidade } from "./Unidade.entity";
import { Produto } from "./Produto.entity";

@Entity("categoria")
export class Categoria {
    @PrimaryGeneratedColumn()
    Id!: number

    @Column({ type: 'varchar', nullable: false, length: 100 })
    Nome!: string

    @Column({ type: 'varchar', nullable: true, length: 500 })
    Descricao!: string

    @ManyToOne(() => Unidade, (unidade) => unidade.Categorias)
    Unidade?: Unidade

    @OneToOne(() => Produto, (produto) => produto.Categoria)
    Produtos?: Produto[]
}