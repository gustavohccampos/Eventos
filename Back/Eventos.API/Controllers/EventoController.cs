using Eventos.Application.DTO;
using Eventos.Application.Interfaces;
using Eventos.Domain.Models;

using Microsoft.AspNetCore.Mvc;


namespace Eventos.API.Controllers;


public class EventoController : GeralController
{

    private readonly IEventoService _eventoService;

    public EventoController(IEventoService eventoService)
    {
        _eventoService = eventoService;
    }

        // GET: api/
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Evento>>> GetEventos()
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);

                if (eventos == null)
                    return NoContent();

            

                return Ok(eventos);
            }
            catch (Exception ex)
            {

                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao recuperar Eventos!. Erro:{ ex.Message}");
            }
        
        }

        // GET: api/Evento/3
        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> GetEventoById(int id)
        {
        try
        {
            var evento = await _eventoService.GetEventoByIdAsync(id,true);

            if (evento == null)
                return NoContent();
            // return NotFound($"Evento por ID:[{id}] Encontrado!");

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao recuperar Eventos!. Erro:{ex.Message}");
        }

    }

    // GET: api/Evento/tema/FrontEnd
    [HttpGet("tema/{tema}")]
    public async Task<ActionResult> GetEventoByTema(string tema)
    {
        try
        {
            var evento = await _eventoService.GetAllEventosByTemaAsync(tema, true);

            if (evento == null)
                return NoContent();
            //return NotFound($"Nenhum Evento por Tema:[{tema}] Encontrado!");

            return Ok(evento);
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao recuperar Eventos!. Erro:{ex.Message}");
        }

    }

    // PUT: api/Evento/3
    [HttpPut("{id}")]
        public async Task<IActionResult> PutEvento(int id, EventoDTO model)
        {
            try
            {
                var evento = await _eventoService.UpdateEvento(id, model);

                if (evento == null)
                return NoContent();
            //return BadRequest($"Erro ao editar Evento!");

            return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao editar Evento!. Erro:{ex.Message}");
            }

    }

        // POST: api/Evento
        [HttpPost]
        public async Task<ActionResult<Evento>> PostEvento(EventoDTO model)
        {
            try
            {
                var evento = await _eventoService.AddEvento(model);

                if (evento == null)
                return NoContent();
            //return BadRequest($"Erro ao tentar adicionar Evento!");

            return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao adicionar Evento!. Erro:{ex.Message}");
            }
    }

        // DELETE: api/Evento/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvento(int id)
        {
        try
        {
            var evento = await _eventoService.GetEventoByIdAsync(id, true);

             if (evento == null) return NoContent();

            return await _eventoService.DeleteEvento(id) ?
                Ok("Evento Deletado!") :
               throw new Exception("Erro ao deletar Evento.");
            
        }
        catch (Exception ex)
        {
            return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao deletar Evento!. Erro:{ex.Message}");
        }
    }


    }

