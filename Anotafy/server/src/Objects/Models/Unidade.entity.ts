import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    JoinColumn,
} from "typeorm";
import { TipoUnidade } from "../Enums/TipoUnidade";
import { StatusUnidade } from "../Enums/StatusUnidade";
import { Empresa } from "./Empresa.entity";
import { Categoria } from "./Categoria.entity";
import { Usuario } from "./Usuario.entity";
import { Mesa } from "./Mesa.entity";

@Entity("unidade")
export class Unidade {
    @PrimaryGeneratedColumn({ name: "id_unidade" })
    Id!: number;

    @ManyToOne(() => Unidade, (unidade) => unidade.UnidadesFiliais, {
        nullable: true,
    })
    @JoinColumn({ name: "id_matriz" })
    Matriz?: Unidade;

    @OneToMany(() => Unidade, (unidade) => unidade.Matriz, { nullable: true })
    UnidadesFiliais?: Unidade[];

    @Column({ name: "nome", type: "varchar", length: 150, nullable: false })
    Nome!: string;

    @Column({
        name: "tipo_unidade",
        type: "enum",
        enum: TipoUnidade,
        nullable: false,
    })
    TipoUnidade!: TipoUnidade;

    @Column({ name: "cnpj", type: "varchar", length: 14, nullable: false })
    Cnpj!: string;

    @Column({ name: "cep", type: "varchar", length: 8, nullable: false })
    Cep!: string;

    @Column({
        name: "logradouro",
        type: "varchar",
        length: 150,
        nullable: false,
    })
    Logradouro!: string;

    @Column({ name: "numero", type: "varchar", length: 10, nullable: false })
    Numero!: string;

    @Column({
        name: "complemento",
        type: "varchar",
        length: 300,
        nullable: true,
    })
    Complemento?: string;

    @Column({ name: "bairro", type: "varchar", length: 150, nullable: false })
    Bairro!: string;

    @Column({ name: "cidade", type: "varchar", length: 150, nullable: false })
    Cidade!: string;

    @Column({ name: "estado", type: "varchar", length: 2, nullable: false })
    Estado!: string;

    @Column({
        name: "codigo_municipio_ibge",
        type: "varchar",
        length: 7,
        nullable: false,
    })
    CodigoMunicipioIbge!: string;

    @Column({ name: "telefone", type: "varchar", length: 11, nullable: false })
    Telefone!: string;

    @Column({ name: "email", type: "varchar", length: 150, nullable: false })
    Email!: string;

    @Column({
        name: "status",
        type: "enum",
        enum: StatusUnidade,
        nullable: false,
    })
    Status!: StatusUnidade;

    @Column({ name: "data_abertura", type: "date", nullable: false })
    DataAbertura!: Date;

    @Column({
        name: "data_cadastro",
        type: "timestamp with time zone",
        nullable: false,
    })
    DataCadastro!: Date;

    @Column({
        name: "data_atualizacao",
        type: "timestamp with time zone",
        nullable: false,
    })
    DataAtulizacao!: Date;

    @ManyToOne(() => Empresa, (empresa) => empresa.Unidades, {
        nullable: false,
    })
    @JoinColumn({ name: "id_empresa" })
    Empresa!: Empresa;

    @OneToMany(() => Categoria, (categoria) => categoria.Unidade)
    Categorias?: Categoria[];

    @OneToMany(() => Usuario, (funcionario) => funcionario.Unidade)
    Usuarios?: Usuario[];

    @OneToMany(() => Mesa, (mesa) => mesa.Unidade)
    Mesas?: Mesa[];
}
