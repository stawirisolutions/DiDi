import { PROJECT_NAME } from '@/config'
import { getServerToken } from '@/app/hooks/useServerToken'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
    title: `Vendor Dashboard | ${PROJECT_NAME}`
}

const VendorDashboardPage = async () => {
    const token = await getServerToken();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Vendor Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard 
                    title="Products" 
                    count={0} // You might want to fetch the actual count from your API
                    link="/dashboard/vendor/products"
                    description="Manage your product catalog" 
                />
                <DashboardCard 
                    title="Orders" 
                    count={0} // You might want to fetch the actual count from your API
                    link="/dashboard/vendor/orders"
                    description="View and process orders" 
                />
                <DashboardCard 
                    title="Profile" 
                    count={null} 
                    link="/dashboard/vendor/profile"
                    description="Update your store information" 
                />
            </div>
        </div>
    );
}

// Dashboard card component
function DashboardCard({ 
    title, 
    count, 
    description, 
    link 
}: { 
    title: string;
    count: number | null;
    description: string;
    link: string;
}) {
    return (
        <Link href={link}>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white">
                <h2 className="text-xl font-semibold">{title}</h2>
                {count !== null && (
                    <p className="text-3xl font-bold mt-2">{count}</p>
                )}
                <p className="text-gray-600 mt-2">{description}</p>
            </div>
        </Link>
    );
}

export default VendorDashboardPage