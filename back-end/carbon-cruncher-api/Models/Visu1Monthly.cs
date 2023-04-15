using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu1Monthly
{
    public DateTime TimeYearMonth { get; set; }

    public double AnomalyGlobal { get; set; }

    public double AnomalyNorthern { get; set; }

    public double AnomalySouthern { get; set; }
}
