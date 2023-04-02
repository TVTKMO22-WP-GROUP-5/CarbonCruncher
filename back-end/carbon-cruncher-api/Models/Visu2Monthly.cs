using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu2Monthly
{
    public int Id { get; set; }

    public DateTime Time { get; set; }

    public double Average { get; set; }
}
