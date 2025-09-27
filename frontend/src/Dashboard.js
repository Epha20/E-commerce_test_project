import React, { useState, useEffect } from 'react';
import OrdersTable from '../components/OrdersTable';
import Pagination from '../components/Pagination';
import SearchAndFilter from '../components/SearchAndFilter';
import OrdersChart from '../components/OrdersChart';

const fetchOrdersFromAPI = async ({ currentPage, searchTerm, filterStatus }) => {
    console.log(`Fetching page ${currentPage} with search:"${searchTerm}" and status:"${filterStatus}"`);
    return {
        orders: [
            { id: 1, customer: 'Taylor', amount: 100, status: 'delivered', date: '2024-12-20' },
            { id: 2, customer: 'Ephrem', amount: 40, status: 'shipped', date: '2025-08-21' },
        ],
        totalPages: 10,
    };
};

function DashboardPage() {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            setIsLoading(true);
            const response = await fetchOrdersFromAPI({ currentPage, searchTerm, filterStatus });
            setOrders(response.orders);
            setTotalPages(response.totalPages);
            setIsLoading(false);
        };

        fetchOrders();
    }, [currentPage, searchTerm, filterStatus]);

    return (
        <div className="dashboard">
            <h1>Orders Dashboard</h1>
            <OrdersChart data={orders} />
            <SearchAndFilter
                onSearch={setSearchTerm}
                onFilter={setFilterStatus}
            />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <OrdersTable orders={orders} />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default DashboardPage;