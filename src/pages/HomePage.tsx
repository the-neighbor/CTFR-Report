import BranchTable from '../components/BranchTable';
import React, { useEffect, useState } from 'react';
import { WorkflowRun } from '../components/BranchTable';
export interface Branch {
    name: string;
}

interface HomeProps {
    onChange: (selectedBranch: string) => void;
}

interface WorkflowData {
    [k: string]: string | number | boolean | null | undefined;
}

const HomePage: React.FC<HomeProps> = ({ onChange }) => {
    const [branches, setBranches] = useState<WorkflowRun[]>([]);
    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

    const convertWorkflowData = (data: WorkflowData): WorkflowRun => {
        const newData = {
            id: data.id as string,
            branch: data.head_branch as string,
            datetime: data.run_started_at as string,
            status: data.status as "completed" | "in_progress" | "queued" | "cancelled" | "skipped",
            conclusion: data.conclusion as "success" | "failure" | "cancelled" | "skipped" | "timed_out" | "action_required" | "neutral" | "stale"
        };
        console.log(newData);
        return newData;
        
    };

    useEffect(() => {
        fetch(`./artifacts/branches.json`)
        .then(response => response.json())
        .then(data => setBranches(data.map(convertWorkflowData)));
    }, []);

    const handleRowClick = (branch: string) => {
        setSelectedBranch(branch);
        onChange(branch);
    };

    return (
        <BranchTable data={branches} onRowClick={handleRowClick} />
    );
};

export default HomePage;