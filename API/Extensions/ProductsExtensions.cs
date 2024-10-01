using API.Entities;

namespace API.Extensions
{
    public static class ProductsExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrEmpty(orderBy)) return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "name" => query.OrderBy(p => p.Name),
                "desc" => query.OrderByDescending(p => p.Name),
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                "brand" => query.OrderBy(p => p.Brand),
                "brandDesc" => query.OrderByDescending(p => p.Brand),
                "type" => query.OrderBy(p => p.Type),
                "typeDesc" => query.OrderByDescending(p => p.Type),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm)) return query.OrderBy(p => p.Name);

            string lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            IQueryable<Product> list = query.Where(p => p.Name.Contains(lowerCaseSearchTerm));

            return list;
        }

        public static IQueryable<Product> Filter(this IQueryable<Product> query, string brand, string type)
        {
            if (!string.IsNullOrEmpty(brand))
            {
                brand = brand.Trim().ToLower();
            }
            else if (!string.IsNullOrEmpty(type))
            {
                type = type.Trim().ToLower();
            }
            else
            {
                return query.OrderBy(p => p.Name);
            }

            IQueryable<Product> list = query.Where(p => p.Brand.ToLower().Equals(brand) || p.Type.ToLower().Equals(type));

            return list;

        }
    }
}