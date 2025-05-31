// src/application/services/order-item/order-item.service.ts

import { Injectable } from '@nestjs/common';
import { OrderItemEntity } from 'src/domain/entities/order-item.entity';
import { IOrderItemRepository } from 'src/domain/repository/order-item.repository.interface';
import { OrderItemId, OrderItemOrderId } from 'src/domain/types/entity-types';

@Injectable()
export class OrderItemService {
  constructor(private readonly orderItemRepo: IOrderItemRepository) {}

  // 🔍 Get order item by its ID
  async getById(id: OrderItemId): Promise<OrderItemEntity | null> {
    return this.orderItemRepo.findById(id);
  }

  // 📦 Get all items by order ID
  async getByOrderId(orderId: OrderItemOrderId): Promise<OrderItemEntity[]> {
    return this.orderItemRepo.findByOrderId(orderId);
  }

  // ➕ Create a new order item
  async create(orderItem: OrderItemEntity): Promise<void> {
    await this.orderItemRepo.save(orderItem);
  }

  // ✏️ Update an order item (e.g., quantity or price)
  async update(orderItem: OrderItemEntity): Promise<void> {
    await this.orderItemRepo.update(orderItem);
  }

  // ❌ Delete item from order
  async delete(id: OrderItemId): Promise<void> {
    await this.orderItemRepo.delete(id);
  }
}
