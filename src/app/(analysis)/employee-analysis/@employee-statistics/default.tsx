import { Suspense } from 'react';

import EmployeeStatisticsChart from '@/components/employee-analysis/charts/EmployeeStatisticsChart';
import EmployeeStatisticsSkeleton from '@/components/employee-analysis/skeletal-loading/EmployeeStatisticsSkeleton';

export default function Default() {
    return (
        <Suspense fallback={<EmployeeStatisticsSkeleton />}>
            <EmployeeStatisticsChart />
        </Suspense>
    )
}
