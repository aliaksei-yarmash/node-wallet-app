module.exports = async ctx => {
  const cardId = Number(ctx.params.id);
  ctx.body = await ctx.transactionsModel.getByCardId(cardId);
}
