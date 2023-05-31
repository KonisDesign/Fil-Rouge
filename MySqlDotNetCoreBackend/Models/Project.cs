namespace MySqlDotNetCoreBackend.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string Tasks { get; set; }
        public string Notifications { get; set; }
        public string Comments { get; set; }
    }
}
