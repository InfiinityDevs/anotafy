import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Comanda } from "./Comanda.entity";
import { Produto } from "./Produto.entity";
import { Usuario } from "./Usuario.entity";

@Entity("item_comanda")
export class ItemComanda {
    @PrimaryColumn({ type: "int" })
    ComandaId!: number;

    @PrimaryColumn({ type: "int" })
    ProdutoId!: number;

    @ManyToOne(() => Comanda, (comanda) => comanda.ItensComanda)
    @JoinColumn({ name: "ComandaId" })
    Comanda!: Comanda;

    @ManyToOne(() => Produto, (produto) => produto.ItensComanda)
    @JoinColumn({ name: "ProdutoId" })
    Produto!: Produto;

    @ManyToOne(() => Usuario, (funcionario) => funcionario.ItensComanda)
    Usuario!: Usuario;

    @Column({ type: "decimal", nullable: false, precision: 10, scale: 2 })
    PrecoUnitario!: number;

    @Column({ type: "int", nullable: false })
    Quantidade!: number;

    @Column({ type: "varchar", nullable: true, length: 255 })
    Observacao?: string;

    @Column({ type: "timestamp with time zone", nullable: false })
    HoraAdicionado!: Date;

    @Column({ type: "timestamp with time zone", nullable: false })
    HoraAtualizado!: Date;
}
