
using Eventos.Persistence.Data;
using Microsoft.EntityFrameworkCore;
using Eventos.Domain.Models;
using Eventos.Persistence.Interfaces;

namespace Eventos.Persistence.Repository;

public class EventoPersistence : IEventoPersistence
{

    private readonly EventosDbContext _dbContext;
    public EventoPersistence(EventosDbContext dbContext)
    {
        _dbContext = dbContext;
     //   _dbContext.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
    }


    public async Task<Evento> GetEventoByIdAsync(int eventoId, bool incluirPalestrantes = false)
    {
        IQueryable<Evento> query =
           _dbContext.Eventos!
           .Include(e => e.Lotes)
           .Include(e => e.RedesSociais);

        if (incluirPalestrantes)
        {
            query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
        }
        query = query.AsNoTracking().OrderBy(e => e.Id).Where(e => e.Id == eventoId);

        var evento = await query.FirstOrDefaultAsync();

        //if (evento == null)
        //{
        //    throw new InvalidOperationException("Evento não encontrado.");
        //}

        return evento!;

    }
    public async Task<Evento[]> GetAllEventosAsync(bool incluirPalestrantes = false)
    {
        IQueryable<Evento> query =
         _dbContext.Eventos!
         .Include(e => e.Lotes)
         .Include(e => e.RedesSociais);

        if (incluirPalestrantes)
        {
            query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
        }
        query = query.AsNoTracking().OrderBy(e => e.Id);

        return await query.ToArrayAsync();

    }

    public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false)
    {
        IQueryable<Evento> query =
           _dbContext.Eventos!
           .Include(e => e.Lotes)
           .Include(e => e.RedesSociais);

        if (incluirPalestrantes)
        {
            query = query
                .Include(e => e.PalestrantesEventos)
                .ThenInclude(pe => pe.Palestrante);
        }
        query = query.AsNoTracking().OrderBy(e => e.Id)
            .Where(e => e.Tema!.ToLower().Contains(tema.ToLower()));

        return await query.ToArrayAsync();

    }




}
