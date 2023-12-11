export async function getPaginatedItems(model, req, itemsName = "items") {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  // get total documents in the collection
  const totalItems = await model.countDocuments();
  // get total pages
  const totalPages = Math.ceil(totalItems / limit);
  // get paginated items
  const items = await model.find().skip(skip).limit(limit);
  // return items, page, limit, total pages, and totalItems
  return {
    [itemsName]: items,
    pgaination: {
      page,
      limit,
      totalItems,
      totalPages,
    },
  };
}
