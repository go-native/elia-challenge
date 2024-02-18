using EliaChallengeAPI.Models;
using EliaChallengeAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EliaChallengeAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class FiguresController : ControllerBase
{


    private readonly ILogger<FiguresController> _logger;
    private readonly FiguresService _figuresService;

    public FiguresController(ILogger<FiguresController> logger, FiguresService figuresService)
    {
        _logger = logger;
        _figuresService = figuresService;
    }

    [HttpGet]
    public async Task<List<Figure>> Get()
    {
        return await _figuresService.GetAsync();
    }

    [HttpPost]
    public async Task<IActionResult> Post(Figure newFigure)
    {
        await _figuresService.CreateAsync(newFigure);

        return CreatedAtAction(nameof(Get), new { id = newFigure.Id }, newFigure);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Figure updatedFigure)
    {
        var figure = await _figuresService.GetAsync(id);
        if (figure is null)
        {
            return NotFound();
        }
        updatedFigure.Id = figure.Id;
        await _figuresService.UpdateAsync(id, updatedFigure);

        return NoContent();
    }
}
