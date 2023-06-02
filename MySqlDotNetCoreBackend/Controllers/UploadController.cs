using System.IO;
using Microsoft.AspNetCore.Mvc;

[Route("[controller]")]
[ApiController]
public class UploadController : ControllerBase
{
    private readonly IFileService _fileService;

    public UploadController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost]
    public IActionResult UploadFile()
    {
        try
        {
            var file = Request.Form.Files[0];
            var filePath = _fileService.SaveFile(file);
            Console.WriteLine(filePath);
            return Ok();
        }
        catch (Exception ex)
        {
            Console.WriteLine("Erreur lors du téléchargement du fichier :", ex);
            return StatusCode(500, "Une erreur est survenue lors du téléchargement du fichier.");
        }
    }
}

