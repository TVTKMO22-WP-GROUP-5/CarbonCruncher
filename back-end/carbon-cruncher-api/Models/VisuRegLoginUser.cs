using System.ComponentModel.DataAnnotations;

namespace carbon_cruncher_api.Models
{
    public class VisuRegLoginUser
    {
        [Required]
        [StringLength(20,MinimumLength = 3)]
        public string UserNick { get; set; } = string.Empty;
        [Required]
        [StringLength(20, MinimumLength = 3)]
        public string UserPassword { get; set; } = string.Empty;
    }
}
