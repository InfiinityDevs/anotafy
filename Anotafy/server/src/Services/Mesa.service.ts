import ResponseGetMesasDTO from "../Data/Dtos/ResponseGetMesasDTO";
import ComandaRepository from "../Data/Repositories/Comanda.repository";
import { MesaRepository } from "../Data/Repositories/Mesa.repository";
import { StatusComanda } from "../Objects/Enums/StatusComanda";
import { StatusMesa } from "../Objects/Enums/StatusMesa";
import { Comanda } from "../Objects/Models/Comanda.entity";

export class MesaService {
    private readonly repo = new MesaRepository();
    private readonly repoComanda = new ComandaRepository();

    async GetMesas(id: number): Promise<ResponseGetMesasDTO[]> {
        const response: ResponseGetMesasDTO[] = [];
        const mesas = await this.repo.GetMesasForUser({ id: id });

        for (const mesa of mesas) {
            let inicio = null;
            if (
                [StatusMesa.OCUPADA, StatusMesa.EM_FECHAMENTO].includes(
                    mesa.Status
                )
            ) {

                const comanda: Comanda | null =
                    await this.repoComanda.getComandaForMesa({
                        id: mesa.Id,
                        status: [
                            StatusComanda.EM_FECHAMENTO,
                            StatusComanda.OCUPADA,
                        ],
                    });
                
                
                if (comanda) {
                    inicio = comanda.HoraAbertura;
                }
            }

            response.push({
                id: mesa.Id,
                identificacao: mesa.Identificacao,
                status: mesa.Status, 
                ...(inicio && { inicio: inicio }),
            });
        }

        return response;
    }
}
