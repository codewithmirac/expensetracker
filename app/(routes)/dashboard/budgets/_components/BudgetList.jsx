import React from 'react'
import CreateBudget from "@/app/(routes)/dashboard/budgets/_components/CreateBudget";


function BudgetList() {
    return (
        <div className={'m-7'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}>
                <CreateBudget/>
            </div>

        </div>

    )
}

export default BudgetList
