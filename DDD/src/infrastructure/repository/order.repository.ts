import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItem from "../../domain/entity/order-item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total(),
            items: entity.items.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_id: item.productId,
                    quantity: item.quantity
                }
            })
        },
            {
                include: [{ model: OrderItemModel }]
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total(),
        },
            {
                where: {
                    id: entity.id
                }
            }
        );

        for (const item of entity.items) {
            await OrderItemModel.update({
                name: item.name,
                price: item.price,
                product_id: item.productId,
                order_id: entity.id,
                quantity: item.quantity
            },
                {
                    where: {
                        id: item.id
                    }
                });
        }
    }

    async find(id: string): Promise<Order> {
        let order 
        try{
            order = await OrderModel.findOne({
                where: { id: id },
                include: ["items"],
                rejectOnEmpty: true
            });
        }catch(e) {
            throw new Error(`Order with id ${id} not found`);
        }

        const items = order.items.map((item) => {
            return new OrderItem(
                item.id,
                item.name,
                item.price,
                item.product_id,
                item.quantity
            );
        });

        return new Order(order.id, order.customer_id, items);
    }

    async findAll(): Promise<Order[]> {
        const orders = await OrderModel.findAll({
            include: ["items"]
        });

        return orders.map((order) => {
            const items = order.items.map((item) => {
                return new OrderItem(
                    item.id,
                    item.name,
                    item.price,
                    item.product_id,
                    item.quantity
                );
            });

            return new Order(order.id, order.customer_id, items);
        });
    }



}