using System.ComponentModel.DataAnnotations;


namespace Eventos.Domain.Models;

public class Evento
{
    public int Id { get; set; }
    [Required]
    public string? Nome { get; set; }
    [Required]
    public string? Local { get; set; }
    [Required]
    public DateTime? DataEvento { get; set; }
    public string? Tema { get; set; }
    public int QtdPessoas { get; set; }

    public string ImagemURL { get; set; } = string.Empty;
    public DateTime DataCadastro { get; set; }

    public string Email { get; set; } = string.Empty;

    public string Telefone { get; set; } = string.Empty;

    public IEnumerable<Lote> Lotes { get; set; } 
    public IEnumerable<RedeSocial> RedesSociais { get; set; } 


    public IEnumerable<PalestranteEvento> PalestrantesEventos { get; set; }



}
