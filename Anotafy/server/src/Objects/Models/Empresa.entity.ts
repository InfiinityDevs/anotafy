import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StatusEmpresa } from "../Enums/StatusEmpresa";
import { Unidade } from "./Unidade.entity";

@Entity("empresa")
export class Empresa {
    @PrimaryGeneratedColumn({ name: "id_empresa" })
    Id?: number;

    @Column({
        name: "razao_social",
        type: "varchar",
        length: 100,
        nullable: false,
    })
    RazaoSocial!: string;

    @Column({
        name: "nome_fantasia",
        type: "varchar",
        length: 150,
        nullable: false,
    })
    NomeFantasia!: string;

    @Column({ name: "cnpj_raiz", type: "varchar", length: 14, nullable: false })
    CnpjRaiz?: string;

    @Column({ name: "data_fundacao", type: "date", nullable: true })
    DataFundacao!: Date;

    @Column({
        name: "cnae_principal",
        type: "varchar",
        length: 7,
        nullable: true,
    })
    CnaePrincipal!: string;

    @Column({
        name: "telefone_principal",
        type: "varchar",
        length: 11,
        nullable: true,
    })
    TelefonePrincipal!: string;

    @Column({
        name: "email_principal",
        type: "varchar",
        length: 200,
        nullable: true,
    })
    EmailPrincipal!: string;

    @Column({ name: "website", type: "varchar", length: 200, nullable: true })
    Website?: string;

    @Column({ name: "logo_url", type: "varchar", length: 255, nullable: true })
    LogoUrl?: string;

    @Column({
        name: "status",
        type: "enum",
        enum: StatusEmpresa,
        nullable: false,
    })
    Status!: StatusEmpresa;

    @Column({
        name: "data_cadastro",
        type: "timestamp with time zone",
        nullable: false,
    })
    DataCadastro!: Date;

    @Column({
        name: "data_atualizacao",
        type: "timestamp with time zone",
        nullable: true,
    })
    DataAtualizacao!: Date;

    @OneToMany(() => Unidade, (unidade) => unidade.Empresa)
    Unidades?: Unidade[];
}
