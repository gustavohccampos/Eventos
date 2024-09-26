using AutoMapper;
using Eventos.Application.DTO;
using Eventos.Domain.Models;

namespace Eventos.Application.Helpers;

public class EventosProfile : Profile
{
    public EventosProfile() {

        CreateMap<Evento, EventoDTO>().ReverseMap();
        CreateMap<Lote, LoteDTO>().ReverseMap();
        CreateMap<Palestrante, PalestranteDTO>().ReverseMap();
        CreateMap<RedeSocial, RedeSocialDTO>().ReverseMap();
    }

}
