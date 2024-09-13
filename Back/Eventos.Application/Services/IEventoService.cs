﻿using Eventos.Domain.Models;

namespace Eventos.Application.Interfaces
{
    public interface IEventoService
    {
        Task <Evento> AddEvento(Evento model);
        Task <Evento> UpdateEvento(int eventoId, Evento model);
        Task<bool> DeleteEvento(int eventoId);



        //EVENTOS
        Task<Evento> GetEventoByIdAsync(int eventoId, bool incluirPalestrantes = false);
        Task<Evento[]> GetAllEventosAsync(bool incluirPalestrantes = false);
        Task<Evento[]> GetAllEventosByTemaAsync(string tema, bool incluirPalestrantes = false);

    }
}
