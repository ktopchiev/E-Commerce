using Microsoft.EntityFrameworkCore;

namespace API.RequestHelpers
{

    public class PagedList<T> : List<T>
    {
        public MetaData MetaData { get; }

        public PagedList(List<T> items, int itemsCount, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                TotalItemsCount = itemsCount,
                TotalPages = (int)Math.Ceiling(itemsCount / (double)pageSize),
                CurrentPage = pageNumber,
                PageSize = pageSize
            };

            AddRange(items);
        }

        public static async Task<PagedList<T>> ToPagedList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();

            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

            return new PagedList<T>(items, count, pageNumber, pageSize);
        }

    }
}