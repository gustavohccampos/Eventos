using Eventos.Application.DTO;

namespace Eventos.Application.Interfaces
{
    public interface IEventoService
    {
        Task <EventoDTO> AddEvento(EventoDTO model);
        Task <EventoDTO> UpdateEvento(int eventoId, EventoDTO model);
        Task<bool> DeleteEvento(int eventoId);



        //EVENTOS
        Task<EventoDTO> GetEventoByIdAsync(int eventoId, bool incluirPalestrantes = false);
        Task<EventoDTO[]> GetAllEventosAsync(bool incluirPalestrantes = false);
        Task<EventoDTO[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false);

    }
}
