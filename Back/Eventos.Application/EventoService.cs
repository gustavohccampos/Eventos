using Eventos.Application.Interfaces;
using Eventos.Domain.Models;
using Eventos.Persistence.Interfaces;

namespace Eventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersistence _galeralPersistence;
        private readonly IEventoPersistence _eventoPersistence;

        public EventoService(IGeralPersistence geralPersistence, IEventoPersistence eventoPersistence)
        {
            _galeralPersistence = geralPersistence;
            _eventoPersistence = eventoPersistence;
        }
        public async Task<Evento> AddEvento(Evento model)
        {
            try
            {
                _galeralPersistence.Add<Evento>(model);
                if (await _galeralPersistence.SaveChangesAsync())
                { 
                    return await _eventoPersistence.GetEventoByIdAsync(model.Id,false);
                }

                return null!;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }

        public async Task<Evento> UpdateEvento(int eventoId, Evento model)
        {
            try
            {
                var evento = await _eventoPersistence.GetEventoByIdAsync(eventoId, false);

                if (evento == null) return null!;

                model.Id = evento.Id;

                _galeralPersistence.Update(model);

                if (await _galeralPersistence.SaveChangesAsync())
                {
                    return await _eventoPersistence.GetEventoByIdAsync(model.Id, false);
                }

                return null!;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEvento(int eventoId)
        {
            try
            {
                var evento = await _eventoPersistence.GetEventoByIdAsync(eventoId, false);

                if (evento == null) throw new Exception("Evento para Delete não encontrado!");

                _galeralPersistence.Delete<Evento>(evento);

                return await _galeralPersistence.SaveChangesAsync();

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public async Task<Evento[]> GetAllEventosAsync(bool incluirPalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersistence.GetAllEventosAsync(incluirPalestrantes);

                if (eventos == null) return null!;

                return eventos;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }

        public async Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersistence.GetAllEventosByTemaAsync(tema, incluirPalestrantes);

                if (eventos == null) return null!;

                return eventos;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        public async Task<Evento> GetEventoByIdAsync(int eventoId, bool incluirPalestrantes = false)
        {

            try
            {
                var eventos = await _eventoPersistence.GetEventoByIdAsync(eventoId,incluirPalestrantes);

                if (eventos == null) return null!;

                return eventos;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

    
    }

}
