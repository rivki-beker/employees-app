namespace Employees.API.Models
{
    public class RolePostModel
    {
        public int RoleNameId { get; set; }
        public bool IsManager { get; set; }
        public DateTime StartDate { get; set; }
        public int EmployeeId { get; set; }
    }
}
