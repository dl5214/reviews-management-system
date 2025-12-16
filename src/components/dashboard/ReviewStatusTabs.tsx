"use client";

type Status = "all" | "pending" | "approved" | "rejected";

export function ReviewStatusTabs({
                                     value,
                                     onChange,
                                     counts,
                                     showCounts = true,
                                     label,
                                     className = "",
                                 }: {
    value: Status;
    onChange: (v: Status) => void;
    counts?: { all: number; pending: number; approved: number; rejected: number };
    showCounts?: boolean;
    label?: string;
    className?: string;
}) {
    const tabs: Array<{
        value: Status;
        label: string;
        activeBg: string;
        activeText: string;
        countActive: string;
    }> = [
        { value: "all", label: "All", activeBg: "bg-white", activeText: "text-slate-800", countActive: "text-slate-500" },
        { value: "pending", label: "Pending", activeBg: "bg-amber-50", activeText: "text-amber-700", countActive: "text-amber-600" },
        { value: "approved", label: "Approved", activeBg: "bg-teal-50", activeText: "text-teal-700", countActive: "text-teal-600" },
        { value: "rejected", label: "Rejected", activeBg: "bg-rose-50", activeText: "text-rose-700", countActive: "text-rose-600" },
    ];

    return (
        <div className={className}>
            {label ? (
                <label className="block text-xs font-medium text-slate-500 mb-1 sm:mb-1.5">
                    {label}
                </label>
            ) : null}

            <div className="bg-slate-100 rounded-lg p-1 sm:p-0 sm:h-[42px] sm:px-3 sm:flex sm:items-center">
                <div className="grid grid-cols-4 gap-1 sm:gap-4 w-full">
                    {tabs.map((tab) => {
                        const isActive = value === tab.value;
                        const count = counts?.[tab.value];

                        return (
                            <button
                                key={tab.value}
                                onClick={() => onChange(tab.value)}
                                className={`py-2 sm:py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap w-full ${
                                    isActive
                                        ? `${tab.activeBg} ${tab.activeText} shadow-sm`
                                        : "text-slate-600 hover:text-slate-800 hover:bg-slate-200"
                                }`}
                            >
                                {tab.label}
                                {showCounts && typeof count === "number" ? (
                                    <>
                                        {" "}
                                        <span className={isActive ? tab.countActive : "text-slate-400"}>{count}</span>
                                    </>
                                ) : null}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}