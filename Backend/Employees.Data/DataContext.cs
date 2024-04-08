using Employees.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Employees.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<RoleName> RoleNames { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = "Server=bvxrqklv4vzmj0h7sn6n-mysql.services.clever-cloud.com;Port=3306;Database=bvxrqklv4vzmj0h7sn6n;Uid=uvybcmvlyprmzaa1;Pwd=n2wKwkejUWl61fQ6z6km;";
            optionsBuilder.UseMySQL(connectionString);
        }
    }
}