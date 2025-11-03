interface ExtractDateProps {
    date: Date;
    format?: "date" | "time" | "datetime" | "full" | "relative";
}

export function formatDate({ date, format }: ExtractDateProps) {
    console.log(date)
    if (format === "date") {
        
    } else if (format === "time") {
        return date.toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
        });
    } else if (format === "datetime") {
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } else if (format === "full") {
        return date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        
    } else if (format === "relative") {
        const now = new Date();
        const diferenca = now.getTime() - date.getTime();
        let diferencaDias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        let diferencaHoras = Math.floor(diferenca / (1000 * 60 * 60));
        let diferencaMinutos = Math.floor(diferenca / (1000 * 60));

        if (diferencaDias > 0) {
            if (diferencaHoras > 23) {
                diferencaHoras = diferencaHoras -(
                    Math.floor(diferencaHoras / 24) * 24
                );
            }
            return `${diferencaDias}d e ${diferencaHoras}h atrás`;
        } else if (diferencaHoras > 0) {
            if (diferencaMinutos > 59) {
                diferencaMinutos =
                    diferencaMinutos - (Math.floor(diferencaMinutos / 60) * 60);
            }
            return `${diferencaHoras}h e ${diferencaMinutos}min atrás`;
        } else if (diferencaMinutos > 0) {
            return `${diferencaMinutos}min atrás`;
        }

    }

    return "";
}