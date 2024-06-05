import React from 'react'
import { AccountFilter } from './AccountFilter'
import { DateFilter } from './DateFilter'

export const Filters = () => {
  return (
    <div className="flex flex-row lg:flex-row gap-y-2 lg:gap-x-2 items-center">
        <AccountFilter/>
        <DateFilter/>
    </div>
  )
}
