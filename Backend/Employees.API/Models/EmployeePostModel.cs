namespace Employees.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsMale { get; set; }
        public List<RolePostModel> Roles { get; set; }
        public bool IsActive { get; set; }
    }
}
