using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class Visu2Annual
{
    public int Id { get; set; }

    public int Year { get; set; }

    public double Mean { get; set; }
}
