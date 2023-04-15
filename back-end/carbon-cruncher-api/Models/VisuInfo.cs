using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class VisuInfo
{
    public int Id { get; set; }

    public int VisuNumber { get; set; }

    public int VisuChartNumber { get; set; }

    public string? Title { get; set; }

    public string? DescriptionText { get; set; }

    public string? DescriptionLink { get; set; }

    public string? DataLink { get; set; }
}
