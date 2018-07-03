const searchQuery = () => {
  const isSearchPage =  location.pathname === '/search';
  const query = location.search;

  return isSearchPage ? query.replace(/&.+/g, '').split(/\?q=/)[1] : '';
}

export default searchQuery;