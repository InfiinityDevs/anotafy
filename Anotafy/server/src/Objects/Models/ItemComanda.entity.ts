import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Comanda } from "./Comanda.entity";
import { Produto } from "./Produto.entity";
import { Usuario } from "./Usuario.entity";

@Entity("item_comanda")
export class ItemComanda {
    @PrimaryColumn({ name: "id_comanda", type: "int" })
    ComandaId!: number;

    @PrimaryColumn({ name: "id_produto", type: "int" })
    ProdutoId!: number;

    @ManyToOne(() => Comanda, (comanda) => comanda.ItensComanda, { nullable: false })
    @JoinColumn({ name: "id_comanda" })
    Comanda!: Comanda;

    @ManyToOne(() => Produto, (produto) => produto.ItensComanda, { nullable: false })
    @JoinColumn({ name: "id_produto" })
    Produto!: Produto;

    @ManyToOne(() => Usuario, (funcionario) => funcionario.ItensComanda)
    @JoinColumn({ name: "id_usuario" })
    Usuario!: Usuario;

    @Column({
        name: "preco_unitario",
        type: "decimal",
        nullable: false,
        precision: 10,
        scale: 2,
    })
    PrecoUnitario!: number;

    @Column({ name: "quantidade", type: "int", nullable: false })
    Quantidade!: number;

    @Column({
        name: "observacao",
        type: "varchar",
        nullable: true,
        length: 255,
    })
    Observacao?: string;

    @Column({
        name: "hora_adicionado",
        type: "timestamp with time zone",
        nullable: false,
    })
    HoraAdicionado!: Date;

    @Column({
        name: "hora_atualizado",
        type: "timestamp with time zone",
        nullable: false,
    })
    HoraAtualizado!: Date;
}
