using System.ComponentModel.DataAnnotations;

namespace MySqlDotNetCoreBackend.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "L'adresse email est requise.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Le mot de passe est requis.")]
        public string Password { get; set; }

        public string Firstname { get; set; } = string.Empty;

        public string Lastname { get; set; } = string.Empty;

        public string Job { get; set; } = null;

        public string Projects { get; set; } = null;
        public string Role { get; set; } = "user";
        public string Url { get; set; } = "profile.webp";
    }
}
