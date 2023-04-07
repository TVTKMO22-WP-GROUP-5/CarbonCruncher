using System.ComponentModel.DataAnnotations;

namespace carbon_cruncher_api.Models
{
    public class VisuRegLoginUser
    {
        public string UserNick { get; set; } = null!;
        public string UserPassword { get; set; } = null!;
    }
}
