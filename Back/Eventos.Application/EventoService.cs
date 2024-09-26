using AutoMapper;
using Eventos.Application.DTO;
using Eventos.Application.Interfaces;
using Eventos.Domain.Models;
using Eventos.Persistence.Interfaces;
using Microsoft.Extensions.Logging;

namespace Eventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersistence _galeralPersistence;
        private readonly IEventoPersistence _eventoPersistence;
        private readonly IMapper _mapper;

        public EventoService(IGeralPersistence geralPersistence, IEventoPersistence eventoPersistence, IMapper mapper)
        {
            _galeralPersistence = geralPersistence;
            _eventoPersistence = eventoPersistence;
            _mapper = mapper;
        }
        public async Task<EventoDTO> AddEvento(EventoDTO model)
        {
            try
            {
                var evento = _mapper.Map<Evento>(model);

                _galeralPersistence.Add<Evento>(evento);
                if (await _galeralPersistence.SaveChangesAsync())
                { 
                    var eventoRetorno = await _eventoPersistence.GetEventoByIdAsync(evento.Id,false);

                    return _mapper.Map<EventoDTO>(eventoRetorno);
                }

                return null!;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }

        public async Task<EventoDTO> UpdateEvento(int eventoId, EventoDTO model)
        {
            try
            {
                var evento = await _eventoPersistence.GetEventoByIdAsync(eventoId, false);

                if (evento == null) return null!;

                model.Id = evento.Id;

                _mapper.Map(model,evento);

                _galeralPersistence.Update<Evento>(evento);

                if (await _galeralPersistence.SaveChangesAsync())
                {
                    var eventoRetorno = await _eventoPersistence.GetEventoByIdAsync(evento.Id, false);
                    return _mapper.Map<EventoDTO>(eventoRetorno);
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

        public async Task<EventoDTO[]> GetAllEventosAsync(bool incluirPalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersistence.GetAllEventosAsync(incluirPalestrantes);

                if (eventos == null) return null!;

                var resultados = _mapper.Map<EventoDTO[]>(eventos);

                return resultados;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
           
        }

        public async Task<EventoDTO[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false)
        {
            try
            {
                var eventos = await _eventoPersistence.GetAllEventosByTemaAsync(tema, incluirPalestrantes);

                if (eventos == null) return null!;

                var resultados = _mapper.Map<EventoDTO[]>(eventos);

                return resultados;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

        public async Task<EventoDTO> GetEventoByIdAsync(int eventoId, bool incluirPalestrantes = false)
        {

            try
            {
                var evento = await _eventoPersistence.GetEventoByIdAsync(eventoId,incluirPalestrantes);

                if (evento == null) return null!;

                var resultado = _mapper.Map<EventoDTO>(evento);

                return resultado;

            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }

        }

    
    }

}
