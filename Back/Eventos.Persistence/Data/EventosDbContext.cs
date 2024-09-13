
using Eventos.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Eventos.Persistence.Data;

public class EventosDbContext : DbContext
{
    public EventosDbContext(DbContextOptions<EventosDbContext> options)
        : base(options)
    {

    }

    public DbSet<Evento>? Eventos { get; set; }
    public DbSet<Lote>? Lotes { get; set; }
    public DbSet<Palestrante>? Palestrantes { get; set; }
    public DbSet<PalestranteEvento>? PalestrantesEventos { get; set; }
    public DbSet<RedeSocial>? RedesSociais { get; set; }


    protected override void OnModelCreating(ModelBuilder mb)
    {
        //Essas chaves faz associação Eventos e Palestrantes
        mb.Entity<PalestranteEvento>().HasKey(PE => new
        {
            PE.EventoId,
            PE.PalestranteId
        });


        mb.Entity<Evento>()
            .HasMany(E => E.RedesSociais)
            .WithOne(RS => RS.Evento)
            .OnDelete(DeleteBehavior.Cascade);

        mb.Entity<Palestrante>()
          .HasMany(E => E.RedesSociais)
          .WithOne(RS => RS.Palestrante)
          .OnDelete(DeleteBehavior.Cascade);





        //base.OnModelCreating(mb);
    }


}