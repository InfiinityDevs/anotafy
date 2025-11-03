import { AppDataSource } from "../../data-source";
import { StatusComanda } from "../../Objects/Enums/StatusComanda";
import { Comanda } from "../../Objects/Models/Comanda.entity";

export default class ComandaRepository {
    private repo = AppDataSource.getRepository(Comanda);

    getComandasForMesa({
        id,
        status,
    }: {
        id: number;
        status?: StatusComanda[];
    }): Promise<Comanda[]> {
        return this.repo
            .createQueryBuilder("c")
            .select("c.*")
            .innerJoin("c.Mesa", "m")
            .where("m.Id = :id", { id: id })
            .andWhere(
                status && status.length > 0
                    ? "c.Status in (:...status)"
                    : "1 = 1",
                { status: status }
            )
            .getMany();
    }

    getComandaForMesa({
        id,
        status,
    }: {
        id: number;
        status?: StatusComanda[];
    }): Promise<Comanda | null> {
        const query = this.repo
            .createQueryBuilder("c")
            .innerJoin("c.Mesa", "m")
            .where("m.Id = :id", { id: id });

        if (status && status.length > 0) {
            query.andWhere("c.Status IN (:...status)", { status: status });
        }

        return query.getOne();
    }
}