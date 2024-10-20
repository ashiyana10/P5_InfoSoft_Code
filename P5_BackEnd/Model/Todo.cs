using System.ComponentModel.DataAnnotations;

namespace P5_BackEnd.Model
{
    public class Todo
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 3)]
        public string Title { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public bool Status { get; set; } // Completed or Pending

        //public User? User { get; set; }
    }
}
