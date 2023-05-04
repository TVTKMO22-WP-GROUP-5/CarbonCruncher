using carbon_cruncher_api.Models;
using FluentValidation;

namespace carbon_cruncher_api.Validators
{
    public class VisuUserVisualValidator : AbstractValidator<VisuUserVisual>
    {
        public VisuUserVisualValidator()
        {
            RuleFor(visual => visual.UserId).NotNull();
            RuleFor(visual => visual.UrlHeader).Length(10);
            RuleFor(visual => visual.VisuConfig).NotNull();
        }
    }
}
