import response from "../utils/response.js";

const handlePrismaError = (res, error) => {
    const errors = (error) => {
        switch (error.code) {
            case "P2000":
                return `Valor muito longo para o campo: ${error.meta.column_name}.`;
            case "P2001":
                return `Registro não encontrado no banco de dados.`;
            case "P2002":
                return `Já existe um registro com os mesmos campos.`;
            case "P2003":
                return `Dado inválido, o campo ${error.meta.constraint} não corresponde a um registro existente.`;
            case "P2006":
                return `Campo inválido.`;
            case "P2007":
                return `Campo obrigatório não fornecido: ${error.meta.constraint}.`;
            case "P2014":
                return `Falha de chave estrangeira: ${error.meta.constraint}.`;
            case "P2025":
                return `Registro não encontrado para operação.`;
            default:
                return `Erro no banco de dados.`;
        }
    };

    if (!error.code) return response(res, 500, "Erro do servidor");

    const msg = errors(error);

    return response(res, 400, msg);
};

export default handlePrismaError;
