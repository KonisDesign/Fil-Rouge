namespace MySqlDotNetCoreBackend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Job { get; set; }
        public string Projects { get; set; }
    }
}