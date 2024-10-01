using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

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
    }
}