export const getOffsetLimit = (page = 1, page_size = 10) => {
    return [(page - 1) * page_size, page_size];
};

export const getSearch = (search = '') => {
    return '%' + search.replace(/\s+/g, '%') + '%';
};
