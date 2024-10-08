﻿namespace Eventos.Application.DTO;

public class PalestranteDTO
{

    public int Id { get; set; }
    public string? Nome { get; set; }
    public string? MiniCurriculo { get; set; }
    public string? ImagemURL { get; set; }
    public string? Telefone { get; set; }
    public string? Email { get; set; }

    ////
    public IEnumerable<RedeSocialDTO> RedesSociais { get; set; } 

    public IEnumerable<PalestranteDTO> Palestrantes { get; set; }

}
