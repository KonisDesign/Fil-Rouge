using Microsoft.EntityFrameworkCore;
using MySqlDotNetCoreBackend.Models;
using Microsoft.Extensions.Configuration;
using System.IO;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;


namespace MySqlDotNetCoreBackend
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
       : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                    .AddJsonFile("appsettings.json")
                    .Build();
                optionsBuilder.UseMySql(
                    configuration.GetConnectionString("DefaultConnection"),
                    new MySqlServerVersion(new Version(8, 0, 33))) // Utilisez le constructeur MySqlServerVersion
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors();
            }
        }

    }
}
