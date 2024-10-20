using System.ComponentModel.DataAnnotations;

namespace P5_BackEnd.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 6)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 6)]
        public string LastName { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public bool Status { get; set; } // Active or Inactive

        public ICollection<Todo> Todos { get; set; } = new List<Todo>();
    }
}
