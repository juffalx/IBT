namespace AddisEats.Api.Services.OrderService;
using AddisEats.Api.Models;
using AddisEats.Api.Common;
using AddisEats.Api.DTOs;

public interface IOrderService
{
    Result<Order> GetById(int id);
    Result<Order> CreateOrder(CreateOrderRequest request);
}