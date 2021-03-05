const renderList = (category, shouldHaveSuffix = true) => {
  const listLength = 2
  const isLarge = category && category.length > listLength
  const remainingCats = isLarge && category.length - listLength
  const truncated =
    isLarge &&
    category.slice(0, listLength).join(", ") +
      `${shouldHaveSuffix ? `...and ${remainingCats} more.` : "..."} `
  const notTruncated = !isLarge && category.join(", ")
  return truncated || notTruncated
}

export default renderList
