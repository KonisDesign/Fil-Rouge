public interface IFileService
{
    string SaveFile(IFormFile file);
}

public class FileService : IFileService
{
    public string SaveFile(IFormFile file)
    {
        var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "public");
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }
        
        var filePath = Path.Combine(directoryPath, file.FileName);
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            file.CopyTo(stream);
        }
        return filePath;
    }
}
