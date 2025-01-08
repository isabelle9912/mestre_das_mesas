import Order from "../../models/Order";

/**
  * [Descrição do serviço]
 \*
  * @async
  * @function deleteOrderIdService
  * @param {[number]} id - Número que identifica o Order que será deletado.
  * @throws {AppError} Caso a exclusão do Order falhe.
  * @returns {Promise<void>} Não há retorno.
 \*
  * @example
  * // Exemplo de chamada
  * await deleteOrderIdService(2);
 */

const deleteOrderIdService = async (id: number): Promise<void> => {
  await Order.destroy({
    where: { id },
  });

  return;
};

export default deleteOrderIdService;
