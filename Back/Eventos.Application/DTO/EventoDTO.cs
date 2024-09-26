
using System.ComponentModel.DataAnnotations;

namespace Eventos.Application.DTO
{
   
    public class EventoDTO
    {
     
        public int Id { get; set; }
        
        [Required]
        public string? Nome { get; set; }
    
        public string? Local { get; set; }
      
        public string? DataEvento { get; set; }

        [Required(ErrorMessage ="[{0}] é obrigatório."),
        //  MinLength(3,ErrorMessage = "[{0}] deve ter no mínimo 4 caracteres."),
        // MaxLength(50,ErrorMessage = "[{0}] deve ter no máximo 50 caracteres.")]
        StringLength(50, MinimumLength = 3, ErrorMessage = "[{0}] deve possuir no mínimo 3 e no máximo 50 caracteres.")]
        public string? Tema { get; set; }


        [Display(Name ="Quantidade de Pessoas"),
        Range(1,120000,ErrorMessage ="{0} não pode ser menor que 1 e maior que 120.000")]
        public int QtdPessoas { get; set; }


        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", ErrorMessage ="Não é um formato de imagem válida. (gif,jpge,bmp,png)")]
        public string? ImagemURL { get; set; } 

        public string? DataCadastro { get; set; }

        [Display(Name ="E-mail"),
        Required(ErrorMessage = "[{0}] é obrigatório."),
        EmailAddress(ErrorMessage = "[{0}] precisa ser válido.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "[{0}] é obrigatório."),
        Phone(ErrorMessage = "[{0}] não é válido.")]
        public string? Telefone { get; set; }

        public IEnumerable<LoteDTO> Lotes { get; set; }
        public IEnumerable<RedeSocialDTO> RedesSociais { get; set; }


        public IEnumerable<PalestranteDTO> Palestrantes { get; set; }

    }
}
