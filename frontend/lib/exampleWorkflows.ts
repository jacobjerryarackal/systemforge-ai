import { ExampleWorkflow } from '../components/workflow/WorkflowTypes';

export const EXAMPLE_WORKFLOWS: ExampleWorkflow[] = [
    {
        id: 'insurance-claims',
        title: 'Insurance Claims Processing',
        industry: 'Insurance Operations',

        before: [
            {
                id: 'b1',
                type: 'input',
                label: 'Customer emails a claim',
            },
            {
                id: 'b2',
                type: 'task',
                label: 'Agent opens email manually in Outlook',
            },
            {
                id: 'b3',
                type: 'task',
                label: 'Reads claim details manually',
            },
            {
                id: 'b4',
                type: 'task',
                label: 'Logs into Policy Portal to search policy',
            },
            {
                id: 'b5',
                type: 'decision',
                label: 'Checks claim history in Claims DB',
            },
            {
                id: 'b6',
                type: 'task',
                label: 'Cross-verifies coverage limits manually',
            },
            {
                id: 'b7',
                type: 'task',
                label: 'Creates summary in spreadsheet',
            },
            {
                id: 'b8',
                type: 'task',
                label: 'Emails supervisor for approval',
            },
            {
                id: 'b9',
                type: 'decision',
                label: 'Supervisor approves or rejects',
            },
            {
                id: 'b10',
                type: 'output',
                label: 'Drafts approval or rejection email',
            },
        ],

        after: [
            {
                id: 'a1',
                type: 'automation',
                label: 'Claim intake service captures email automatically',
            },
            {
                id: 'a2',
                type: 'automation',
                label: 'Document parser extracts claim details + policy info',
            },
            {
                id: 'a3',
                type: 'decision',
                label: 'Claims DB + Policy validation check',
            },
            {
                id: 'a4',
                type: 'automation',
                label: 'Coverage validation engine verifies limits',
            },
            {
                id: 'a5',
                type: 'approval',
                label: 'Auto decision: approve / reject / escalate',
            },
            {
                id: 'a6',
                type: 'output',
                label: 'LLM drafts customer response + CRM updated',
            },
        ],

        estimatedReduction: '45–60 min → 10–15 min',
    },

    {
        id: 'recruitment-screening',
        title: 'Recruitment Candidate Screening',
        industry: 'Hiring Operations',

        before: [
            {
                id: 'b1',
                type: 'input',
                label: 'Resumes arrive from LinkedIn',
            },
            {
                id: 'b2',
                type: 'task',
                label: 'HR downloads resumes manually',
            },
            {
                id: 'b3',
                type: 'task',
                label: 'Reviews candidate profile manually',
            },
            {
                id: 'b4',
                type: 'decision',
                label: 'Checks job fit in spreadsheet',
            },
            {
                id: 'b5',
                type: 'task',
                label: 'Compares against JD manually',
            },
            {
                id: 'b6',
                type: 'task',
                label: 'Sends shortlist to hiring manager',
            },
            {
                id: 'b7',
                type: 'decision',
                label: 'Manager approves interview round',
            },
            {
                id: 'b8',
                type: 'output',
                label: 'Recruiter sends candidate response',
            },
        ],

        after: [
            {
                id: 'a1',
                type: 'automation',
                label: 'Resume intake API ingests candidate profiles',
            },
            {
                id: 'a2',
                type: 'automation',
                label: 'Resume parser extracts skills + experience',
            },
            {
                id: 'a3',
                type: 'automation',
                label: 'Skill matching engine scores JD fit',
            },
            {
                id: 'a4',
                type: 'approval',
                label: 'Auto shortlist / reject / escalate',
            },
            {
                id: 'a5',
                type: 'output',
                label: 'LLM drafts recruiter email + ATS updated',
            },
        ],

        estimatedReduction: '35–50 min → 5–8 min',
    },

    {
        id: 'accounts-payable',
        title: 'Accounts Payable Invoice Processing',
        industry: 'Finance Operations',

        before: [
            {
                id: 'b1',
                type: 'input',
                label: 'Vendor emails invoice PDF',
            },
            {
                id: 'b2',
                type: 'task',
                label: 'Finance downloads invoice manually',
            },
            {
                id: 'b3',
                type: 'task',
                label: 'Reads invoice details manually',
            },
            {
                id: 'b4',
                type: 'decision',
                label: 'Checks PO and vendor details',
            },
            {
                id: 'b5',
                type: 'task',
                label: 'Validates GST + payment terms',
            },
            {
                id: 'b6',
                type: 'task',
                label: 'Creates approval note in spreadsheet',
            },
            {
                id: 'b7',
                type: 'approval',
                label: 'Manager approves payment',
            },
            {
                id: 'b8',
                type: 'output',
                label: 'Finance updates ERP manually',
            },
        ],

        after: [
            {
                id: 'a1',
                type: 'automation',
                label: 'Invoice parser extracts PDF invoice data',
            },
            {
                id: 'a2',
                type: 'decision',
                label: 'PO + Vendor validation layer checks match',
            },
            {
                id: 'a3',
                type: 'automation',
                label: 'Tax validation engine verifies GST rules',
            },
            {
                id: 'a4',
                type: 'approval',
                label: 'Auto approval routing based on invoice value',
            },
            {
                id: 'a5',
                type: 'output',
                label: 'ERP updated + payment workflow triggered',
            },
        ],

        estimatedReduction: '40–55 min → 7–10 min',
    },

    {
        id: 'vendor-onboarding',
        title: 'Vendor Onboarding',
        industry: 'Procurement Operations',

        before: [
            {
                id: 'b1',
                type: 'input',
                label: 'Vendor submits onboarding form',
            },
            {
                id: 'b2',
                type: 'task',
                label: 'Ops team manually validates GST',
            },
            {
                id: 'b3',
                type: 'task',
                label: 'Bank account verification done manually',
            },
            {
                id: 'b4',
                type: 'task',
                label: 'PAN and compliance docs reviewed',
            },
            {
                id: 'b5',
                type: 'decision',
                label: 'Checks duplicate vendor risk',
            },
            {
                id: 'b6',
                type: 'approval',
                label: 'Procurement manager approves vendor',
            },
            {
                id: 'b7',
                type: 'output',
                label: 'Vendor added to ERP manually',
            },
        ],

        after: [
            {
                id: 'a1',
                type: 'automation',
                label: 'Vendor onboarding API receives form data',
            },
            {
                id: 'a2',
                type: 'automation',
                label: 'GST + PAN verification services validate documents',
            },
            {
                id: 'a3',
                type: 'automation',
                label: 'Bank verification service validates account',
            },
            {
                id: 'a4',
                type: 'decision',
                label: 'Duplicate vendor risk engine check',
            },
            {
                id: 'a5',
                type: 'approval',
                label: 'Approval workflow triggered automatically',
            },
            {
                id: 'a6',
                type: 'output',
                label: 'Vendor master created in ERP',
            },
        ],

        estimatedReduction: '60–90 min → 10–15 min',
    },

    {
        id: 'expense-reimbursement',
        title: 'Employee Expense Reimbursement',
        industry: 'Internal Finance',

        before: [
            {
                id: 'b1',
                type: 'input',
                label: 'Employee emails reimbursement request',
            },
            {
                id: 'b2',
                type: 'task',
                label: 'Finance opens receipts manually',
            },
            {
                id: 'b3',
                type: 'task',
                label: 'Reads expense details line by line',
            },
            {
                id: 'b4',
                type: 'decision',
                label: 'Checks policy compliance manually',
            },
            {
                id: 'b5',
                type: 'task',
                label: 'Creates approval note',
            },
            {
                id: 'b6',
                type: 'approval',
                label: 'Manager approves reimbursement',
            },
            {
                id: 'b7',
                type: 'output',
                label: 'Finance updates payroll manually',
            },
        ],

        after: [
            {
                id: 'a1',
                type: 'automation',
                label: 'Receipt parser extracts expense details',
            },
            {
                id: 'a2',
                type: 'automation',
                label: 'Policy compliance engine validates expenses',
            },
            {
                id: 'a3',
                type: 'decision',
                label: 'Fraud + duplicate claim detection',
            },
            {
                id: 'a4',
                type: 'approval',
                label: 'Smart approval routing to manager',
            },
            {
                id: 'a5',
                type: 'output',
                label: 'Payroll updated + employee notified',
            },
        ],

        estimatedReduction: '30–45 min → 5–7 min',
    },

    {
        id: 'customer-support',
        title: 'Customer Support Escalation',
        industry: 'Support Operations',

        before: [
            {
                id: 'b1',
                type: 'input',
                label: 'Customer raises support ticket',
            },
            {
                id: 'b2',
                type: 'task',
                label: 'Agent reads ticket manually',
            },
            {
                id: 'b3',
                type: 'task',
                label: 'Checks CRM for customer history',
            },
            {
                id: 'b4',
                type: 'decision',
                label: 'Determines issue severity manually',
            },
            {
                id: 'b5',
                type: 'task',
                label: 'Routes ticket to correct team',
            },
            {
                id: 'b6',
                type: 'approval',
                label: 'Supervisor handles critical escalation',
            },
            {
                id: 'b7',
                type: 'output',
                label: 'Customer receives final update',
            },
        ],

        after: [
            {
                id: 'a1',
                type: 'automation',
                label: 'Ticket parser classifies issue automatically',
            },
            {
                id: 'a2',
                type: 'automation',
                label: 'CRM lookup service fetches customer history',
            },
            {
                id: 'a3',
                type: 'decision',
                label: 'Severity + SLA priority engine',
            },
            {
                id: 'a4',
                type: 'approval',
                label: 'Critical cases escalated to human lead',
            },
            {
                id: 'a5',
                type: 'output',
                label: 'Auto response + routing + CRM update',
            },
        ],

        estimatedReduction: '25–40 min → 3–5 min',
    },
];