"use client";

import { useUser } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link';

function PlanItemCard({plan}) {
  const {user}=useUser();
  return (
    <div className="p-6 border border-gray-200 shadow-sm rounded-2xl sm:px-8 lg:p-12">
    <div className="text-center">

      <h2 className="text-lg font-medium text-gray-900">
        {plan.name}
        <span className="sr-only">Plan</span>
      </h2>

      <p className="mt-2 sm:mt-4">
        <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> {plan.cost}$ </strong>

        <span className="text-sm font-medium text-gray-700">/month</span>
      </p>
    </div>

    <ul className="mt-6 space-y-2">
        {plan.offering.map((item,index)=>(
             <li className="flex items-center gap-1 mb-2">
                <h2 className="text-gray-700">{item.value}</h2>
             </li>
        ))}
    </ul>

    <Link
      href={plan.paymentLink+'?prefilled_email='+user?.primaryEmailAddress.emailAddress}
      target='_blank'
      className="block px-12 py-3 mt-8 text-sm font-medium text-center text-indigo-600 bg-white border border-indigo-600 rounded-full hover:ring-1 hover:ring-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
    >
      Get Started
    </Link>
  </div>
  )
}

export default PlanItemCard;