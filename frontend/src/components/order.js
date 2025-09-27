import React from 'react';

function OrdersTable({ orders }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>${order.amount.toFixed(2)}</td>
                        <td>{order.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default OrdersTable;