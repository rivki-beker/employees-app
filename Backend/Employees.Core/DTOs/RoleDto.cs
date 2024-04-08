using Employees.Core.Entities;

namespace Employees.Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }
        public int RoleNameId { get; set; }
        public bool IsManager { get; set; }
        public DateTime StartDate { get; set; }
        public int EmployeeId { get; set; }
    }
}