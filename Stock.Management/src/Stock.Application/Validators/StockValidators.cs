using FluentValidation;
using Stock.Application.DTOs;

namespace Stock.Application.Validators;

public class CreateStockRequestValidator : AbstractValidator<CreateStockRequest>
{
    public CreateStockRequestValidator()
    {
        RuleFor(x => x.Sku).NotEmpty().MaximumLength(50);
        RuleFor(x => x.WarehouseId).NotEmpty();
        RuleFor(x => x.InitialQuantity).GreaterThanOrEqualTo(0);
        RuleFor(x => x.Threshold).GreaterThanOrEqualTo(0);
    }
}
