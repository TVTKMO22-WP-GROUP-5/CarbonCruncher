using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu2Icecore
{
    public int Id { get; set; }

    public int IcecoreId { get; set; }

    public int Year { get; set; }

    public double Co2Ppm { get; set; }
}
