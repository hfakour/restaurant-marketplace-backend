// src/application/services/order/order.service.ts

import { Injectable } from '@nestjs/common';
import { OrderEntity } from 'src/domain/entities/order.entity';
import { IOrderRepository } from 'src/domain/repository/order.repository.interface';
import { OrderId, OrderUserId } from 'src/domain/types/entity-types';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepo: IOrderRepository) {}

  // 🔍 Get order by ID
  async getById(id: OrderId): Promise<OrderEntity | null> {
    return this.orderRepo.findById(id);
  }

  // 📄 Get all orders for a user
  async getByUser(userId: OrderUserId): Promise<OrderEntity[]> {
    return this.orderRepo.findAllByUser(userId);
  }

  // ➕ Save a new order
  async create(order: OrderEntity): Promise<void> {
    await this.orderRepo.save(order);
  }

  // ✏️ Update an order (e.g., status, notes)
  async update(order: OrderEntity): Promise<void> {
    await this.orderRepo.update(order);
  }

  // ❌ Cancel/delete an order
  async delete(id: OrderId): Promise<void> {
    await this.orderRepo.delete(id);
  }
}
