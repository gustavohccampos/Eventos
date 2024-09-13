using Eventos.Domain;
using Eventos.Domain.Models;

namespace Eventos.Persistence.Interfaces
{
    public interface IPalestrantePersistence 
    {

        //Palestrantes
        Task<Palestrante> GetPalestranteByIdAsync(int palestranteId, bool incluirEventos);
        Task<Palestrante[]> GetAllPalestrantesAsync(bool incluirEventos);
        Task<Palestrante[]> GetAllPalestrantesByNomeAsync(string nome, bool incluirEventos);

    }


}
