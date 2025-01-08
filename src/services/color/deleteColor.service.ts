import Color from "../../models/Color";

/**
  * [Descrição do serviço]
 \*
  * @async
  * @function deleteColorIdService
  * @param {[number]} id - Número que identifica o Cor que será deletada.
  * @throws {AppError} Caso a exclusão da Cor falhe.
  * @returns {Promise<void>} Não há retorno.
 \*
  * @example
  * // Exemplo de chamada
  * await deleteColorIdService(2);
 */

const deleteColorIdService = async (id: number): Promise<void> => {
  await Color.destroy({
    where: { id },
  });

  return;
};

export default deleteColorIdService;
