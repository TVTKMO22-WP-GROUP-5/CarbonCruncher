using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu3Global
{
    public int YearKbp { get; set; }

    public double GlobalTempChange { get; set; }

    public double? Co2Ppm { get; set; }
}
