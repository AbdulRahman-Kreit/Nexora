"use client";
import dynamic from "next/dynamic";
import TopProductsbyTotalOrdersSkeleton from "@/components/products-analysis/skeletal-loading/TopProductsbyTotalOrdersSkeleton";

const TopProductsbyTotalOrdersChart = dynamic(() => import('@/components/products-analysis/charts/TopProductsbyTotalOrdersChart'), {
    loading: () => <TopProductsbyTotalOrdersSkeleton />,
    ssr: false,
});


export default function Default() {
    return (
        <TopProductsbyTotalOrdersChart />
    )
}
