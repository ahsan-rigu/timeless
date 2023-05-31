const filterProducts = (
  {
    search,
    genders,
    brands,
    categories,
    maxPrice,
    minRating,
    sort,
    outOfStock,
  },
  products
) => {
  if (sort === "P-HTL") {
    products.sort((a, b) => b.price - a.price);
  }
  if (sort === "P-LTH") {
    products.sort((a, b) => a.price - b.price);
  }
  if (sort === "R-HTL") {
    products.sort((a, b) => b.rating - a.rating);
  }

  if (search) {
    products = products.filter(
      ({ name, brand }) =>
        name.toLowerCase().includes(search) ||
        brand.toLowerCase().includes(search)
    );
  }
  if (genders.length > 0) {
    products = products.filter(({ gender }) => genders.includes(gender));
  }

  if (categories.length > 0) {
    products = products.filter(({ category }) => categories.includes(category));
  }

  if (brands.length > 0) {
    products = products.filter(({ brand }) => brands.includes(brand));
  }

  if (maxPrice) {
    products = products.filter(({ price }) => price < maxPrice);
  }
  if (minRating) {
    products = products.filter(({ rating }) => rating > minRating * 2);
  }
  if (!outOfStock) {
    products = products.filter(({ quantity }) => quantity > 0);
  }

  return products;
};

export default filterProducts;
