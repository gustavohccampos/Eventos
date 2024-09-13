
using Eventos.Domain.Models;
using Eventos.Persistence.Data;
using Eventos.Persistence.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Eventos.Persistence.Repository;

public class PalestrantePersistence : IPalestrantePersistence
{

    private readonly EventosDbContext _dbContext;
    public PalestrantePersistence(EventosDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool incluirEventos)
    {
        IQueryable<Palestrante> query =
         _dbContext.Palestrantes!
         .Include(p => p.RedesSociais);

        if (incluirEventos)
        {
            query = query
                .Include(p => p.PalestrantesEventos)
                .ThenInclude(pe => pe.Evento);
        }
        query = query.AsNoTracking().OrderBy(p => p.Id)
            .Where(p => p.Id == palestranteId);

        var palestrante = await query.FirstOrDefaultAsync();

        //if (palestrante == null)
        //{
        //    throw new InvalidOperationException("Palestrante não encontrado.");
        //}

        return palestrante!;
    }

    public async Task<Palestrante[]> GetAllPalestrantesAsync(bool incluirEventos = false)
    {
        IQueryable<Palestrante> query =
         _dbContext.Palestrantes!
         .Include(p => p.RedesSociais);

        if (incluirEventos)
        {
            query = query
                .Include(p => p.PalestrantesEventos)
                .ThenInclude(pe => pe.Evento);
        }
        query = query.AsNoTracking().OrderBy(p => p.Id);

        return await query.ToArrayAsync();

    }

    public async Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool incluirEventos)
    {
        IQueryable<Palestrante> query =
          _dbContext.Palestrantes!
          .Include(p => p.RedesSociais);

        if (incluirEventos)
        {
            query = query
                .Include(p => p.PalestrantesEventos)
                .ThenInclude(pe => pe.Evento);
        }
        query = query.AsNoTracking().OrderBy(p => p.Id)
            .Where(p => p.Nome.ToLower().Contains(nome.ToLower())); ;

        return await query.ToArrayAsync();
    }




}
