using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu5Co2sub
{
    public int Id { get; set; }

    public int SectorId { get; set; }

    public string SSectorName { get; set; } = null!;

    public double EmissionsSharePer { get; set; }

    public virtual Visu5Co2sector Sector { get; set; } = null!;
}
