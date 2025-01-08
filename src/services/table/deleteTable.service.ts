import Table from "../../models/Table";

/**
  * [Descrição do serviço]
 \*
  * @async
  * @function deleteTableIdService
  * @param {[number]} id - Número que identifica a Table que será deletada.
  * @throws {AppError} Caso a exclusão da Table falhe.
  * @returns {Promise<void>} Não há retorno.
 \*
  * @example
  * // Exemplo de chamada
  * await deleteTableIdService(2);
 */

const deleteTableIdService = async (id: number): Promise<void> => {
  await Table.destroy({
    where: { id },
  });

  return;
};

export default deleteTableIdService;
