using Employees.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Employees.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsMale { get; set; }
        public List<RoleDto> Roles { get; set; }
        public bool IsActive { get; set; }
    }
}
