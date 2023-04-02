using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu1Annual
{
    public int Id { get; set; }

    public int TimeYear { get; set; }

    public double AnomalyGlobal { get; set; }

    public double AnomalyNorthern { get; set; }

    public double AnomalySouthern { get; set; }

    public double? TempReconstruction { get; set; }
}
