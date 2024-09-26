using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eventos.Domain.Models;


public class Lote
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }

    public DateTime DataInicio { get; set; }
    public DateTime DataFim { get; set; }

    public int Quantidade { get; set; }



    //[ForeignKey("Eventos")]
    public int EventoId { get; set; }
    
    public Evento? Evento { get; set; } 

}
