using System;
using System.Collections.Generic;

namespace carbon_cruncher_api.Models;

public partial class VisuUserVisual
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string UrlHeader { get; set; } = null!;

    public string VisuConfig { get; set; } = null!;

    public virtual VisuUser User { get; set; } = null!;
}
