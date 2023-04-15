using carbon_cruncher_api.Models;
using FluentValidation;

namespace carbon_cruncher_api.Validators
{
    public class UserValidator : AbstractValidator<VisuRegLoginUser>
    {
        public UserValidator()
        {
            RuleFor(user => user.UserNick).NotEmpty().WithMessage("User nick cannot be empty");
            RuleFor(user => user.UserNick).MinimumLength(3).WithMessage("User nick must be at least 3 characters long");
            RuleFor(user => user.UserNick).MaximumLength(20).WithMessage("User nick must be at most 20 characters long");
            RuleFor(user => user.UserPassword).NotEmpty().WithMessage("User password cannot be empty");
            RuleFor(user => user.UserPassword).MinimumLength(3).WithMessage("User password must be at least 3 characters long");
            RuleFor(user => user.UserPassword).MaximumLength(20).WithMessage("User password must be at most 20 characters long");
            RuleFor(user => user.UserPassword).Matches("[A-Z]").WithMessage("User password must contain at least one uppercase letter");
            RuleFor(user => user.UserPassword).Matches("[a-z]").WithMessage("User password must contain at least one lowercase letter");
            RuleFor(user => user.UserPassword).Matches("[0-9]").WithMessage("User password must contain at least one number");
            RuleFor(user => user.UserPassword).Matches("[^a-zA-Z0-9]").WithMessage("User password must contain at least one special character");
        }
    }
}
