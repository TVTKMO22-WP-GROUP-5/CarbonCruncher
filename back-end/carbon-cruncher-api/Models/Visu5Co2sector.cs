using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu5Co2sector
{
    public int Id { get; set; }

    public string Sector { get; set; } = null!;

    public double EmissionsSharePer { get; set; }

    public virtual ICollection<Visu5Co2sub> Visu5Co2subs { get; set; } = new List<Visu5Co2sub>();
}
