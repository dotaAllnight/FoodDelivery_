"use client"

import { OrderType } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const OrdersPage = () => {

    const { data: session, status } = useSession();

    const router = useRouter();

    if (status === "unauthenticated") {
        router.push("/");
    }

    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            fetch('http://localhost:3000/api/orders').then(
                (res) => res.json(),
            ),

    });

    if (isLoading || status === "loading") return "Loading...";
    return (
        <div className='p-4 lg:px-20 xl:px-40'>
            <table className='w-full border-separate border-spacing-3'>
                <thead>
                    <tr className='text-left'>
                        <th className='hidden md:block'>Order ID</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th className='hidden md:block'>Products</th>
                        <th>Status</th>

                    </tr>

                </thead>
                <tbody>
                    {data.map((item: OrderType) => (

                        <tr className='text-sm md:text-base odd:bg-red-100' key={item.id}>
                            <td className='hidden md:block py-6 px-1'>{item.id}</td>
                            <td className='py-6 px-1'>{item.createdAt.toString().slice(0, 10)}</td>
                            <td className='py-6 px-1'>{item.price}</td>
                            <td className='hidden md:block py-6 px-1'>
                                {item.products && item.products.length > 0 ? item.products[0].title : 'No product'}
                            </td>
                            {
                                session?.user.isAdmin ? (
                                    <td>
                                        <form>
                                            <input placeholder={item.status} className='p-2 ring-1 ring-red-100 rounded-md'
                                            />
                                        </form>
                                    </td>
                                ) :
                                    (
                                        <td className='py-6 px-1'>{item.status}</td>
                                    )
                            }

                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    )
}

export default OrdersPage