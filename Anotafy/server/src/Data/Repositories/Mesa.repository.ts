import { AppDataSource } from "../../data-source";
import { Mesa } from "../../Objects/Models/Mesa.entity";

export class MesaRepository {
    private repo = AppDataSource.getRepository(Mesa);

    async GetMesasForUser({id}: { id: number }): Promise<Mesa[]> {
        return await this.repo
            .createQueryBuilder("m")
            .innerJoin("m.Unidade", "u")
            .innerJoin("u.Usuarios", "usu")
            .where("usu.Id = :id", { id: id })
            .getMany();
    }
}