using Eventos.Domain;
using Eventos.Persistence.Data;
using Eventos.Persistence.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Eventos.Persistence;

public class GeralPersistence : IGeralPersistence
{

    private readonly EventosDbContext _dbContext;
    public GeralPersistence(EventosDbContext dbContext)
    {
        _dbContext= dbContext;
    }

    public void Add<T>(T entity) where T : class
    {
       _dbContext.Add(entity);
    }

    public void Update<T>(T entity) where T : class
    {
        _dbContext.Update(entity);
    }
    public void Delete<T>(T entity) where T : class
    {
        _dbContext.Remove(entity);
    }

    public void DeleteRange<T>(T[] entityArray) where T : class
    {
        _dbContext.RemoveRange(entityArray);
    }
    public async Task<bool> SaveChangesAsync()
    {
        return (await _dbContext.SaveChangesAsync()) > 0;
    }


}
