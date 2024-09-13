using Eventos.Domain.Models;

namespace Eventos.Persistence.Interfaces
{
    public interface IEventoPersistence
    {
 
        //EVENTOS
        Task<Evento> GetEventoByIdAsync(int eventoId, bool incluirPalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool incluirPalestrantes = false);
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false);



    }


}
