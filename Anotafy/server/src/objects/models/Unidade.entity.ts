import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { TipoUnidade } from "../enums/TipoUnidade";
import { StatusUnidade } from "../enums/StatusUnidade";
import { Empresa } from "./Empresa.entity";
import { Categoria } from "./Categoria.entity";
import { Usuario } from "./Usuario.entity";
import { Mesa } from "./Mesa.entity";

@Entity("unidade")
export class Unidade {
    @PrimaryGeneratedColumn()
    Id!: number;

    @ManyToOne(() => Unidade, (unidade) => unidade.UnidadesFiliais, {
        nullable: true,
    })
    Matriz?: Unidade;

    @OneToMany(() => Unidade, (unidade) => unidade.Matriz, { nullable: true })
    UnidadesFiliais?: Unidade[];

    @Column({ type: "varchar", length: 150, nullable: false })
    Nome!: string;

    @Column({ type: "enum", enum: TipoUnidade, nullable: false })
    TipoUnidade!: TipoUnidade;

    @Column({ type: "varchar", length: 14, nullable: false })
    Cnpj!: string;

    @Column({ type: "varchar", length: 8, nullable: false })
    Cep!: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    Logradouro!: string;

    @Column({ type: "varchar", length: 10, nullable: false })
    Numero!: string;

    @Column({ type: "varchar", length: 300, nullable: true })
    Complemento?: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    Bairro!: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    Cidade!: string;

    @Column({ type: "varchar", length: 2, nullable: false })
    Estado!: string;

    @Column({ type: "varchar", length: 7, nullable: false })
    CodigoMunicipioIbge!: string;

    @Column({ type: "varchar", length: 11, nullable: false })
    Telefone!: string;

    @Column({ type: "varchar", length: 150, nullable: false })
    Email!: string;

    @Column({ type: "enum", enum: StatusUnidade, nullable: false })
    Status!: StatusUnidade;

    @Column({ type: "date", nullable: false })
    DataAbertura!: Date;

    @Column({ type: "timestamp with time zone", nullable: false })
    DataCadastro!: Date;

    @Column({ type: "timestamp with time zone", nullable: false })
    DataAtulizacao!: Date;

    @ManyToOne(() => Empresa, (empresa) => empresa.Unidades)
    Empresa!: Empresa;

    @OneToMany(() => Categoria, (categoria) => categoria.Unidade)
    Categorias?: Categoria[];

    @OneToMany(() => Usuario, (funcionario) => funcionario.Unidade)
    Usuarios?: Usuario[];

    @OneToMany(() => Mesa, (mesa) => mesa.Unidade)
    Mesas?: Mesa[];
}
