const renderList = category => {
  const isLarge = category && category.length > listLength
  const remainingCats = isLarge && category.length - listLength
  const truncated =
    isLarge &&
    category.slice(0, listLength).join(", ") + ` ...and ${remainingCats} more.`
  const notTruncated = !isLarge && category.join(", ")
  return truncated || notTruncated
}

export default renderList
