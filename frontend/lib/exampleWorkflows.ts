export type ExampleWorkflow = {
    id: string;
    title: string;
    category: string;

    before: string[];

    after: string[];

    whatChanged: string[];

    timeImpact: {
        before: string;
        after: string;
    };
};

export const EXAMPLE_MESSY_WORKFLOWS: ExampleWorkflow[] = [
    {
        id: 'insurance-claims',
        title: 'Insurance Claim Review',
        category: 'Insurance Operations',

        before: [
            'Customer emails a claim',
            'Agent opens email manually in Outlook',
            'Reads claim details manually',
            'Logs into Policy Portal to search policy',
            'Checks claim history in Claims DB',
            'Cross-verifies coverage limits manually',
            'Creates summary in spreadsheet',
            'Emails supervisor for approval',
            'Waits for supervisor response',
            'Drafts approval or rejection email',
            'Updates CRM manually',
        ],

        after: [
            'Email parser extracts claim data automatically',
            'Policy API validates policy + limits',
            'Claims DB API fetches claim history',
            'Coverage verification engine cross-checks eligibility',
            'Fraud risk scorer calculates fraud score',
            'Decision engine classifies Approve / Reject / Escalate',
            'LLM drafts approval or rejection response',
            'Human review triggered only for escalations',
            'CRM auto-updated',
            'Customer notified automatically',
        ],

        whatChanged: [
            'Removed manual portal lookups',
            'Introduced API-first policy validation',
            'Added fraud risk scoring layer',
            'Human review only for escalations',
            'Auto-generated customer communication',
        ],

        timeImpact: {
            before: '45–60 mins',
            after: '10–15 mins',
        },
    },

    {
        id: 'recruitment-screening',
        title: 'Recruitment Candidate Screening',
        category: 'Hiring Operations',

        before: [
            'Resumes arrive from LinkedIn',
            'HR downloads resumes manually',
            'Reviews candidate profile manually',
            'Checks job fit in spreadsheet',
            'Compares against JD manually',
            'Sends shortlisted resumes to manager',
            'Manager reviews and responds',
            'Interview scheduling via WhatsApp',
        ],

        after: [
            'Resume parser extracts candidate profile',
            'JD matching engine calculates fit score',
            'Ranking engine prioritizes candidates',
            'Auto-shortlisting generated',
            'Hiring manager reviews only top candidates',
            'Interview scheduling automated',
            'Candidate notifications triggered automatically',
        ],

        whatChanged: [
            'Removed manual resume review',
            'Introduced AI fit scoring',
            'Automated ranking and shortlisting',
            'Reduced manager review load',
            'Scheduling fully automated',
        ],

        timeImpact: {
            before: '30–45 mins',
            after: '5–10 mins',
        },
    },

    {
        id: 'invoice-approval',
        title: 'Invoice Approval Workflow',
        category: 'Accounting',

        before: [
            'Vendor emails invoice PDF',
            'Finance downloads invoice manually',
            'Invoice details entered into ERP',
            'Cross-check with PO manually',
            'Manager approval requested via email',
            'Wait for manager response',
            'Payment status updated manually',
        ],

        after: [
            'Invoice parser extracts invoice fields',
            'PO validation engine verifies purchase order',
            'Approval rules engine checks thresholds',
            'Auto-approval for low-risk invoices',
            'Escalation only for exceptions',
            'ERP updated automatically',
            'Payment workflow triggered',
        ],

        whatChanged: [
            'Removed manual invoice entry',
            'Auto-validated PO matching',
            'Approval policy engine added',
            'Reduced manager approval dependency',
            'ERP sync automated',
        ],

        timeImpact: {
            before: '25–40 mins',
            after: '5–8 mins',
        },
    },

    {
        id: 'vendor-onboarding',
        title: 'Vendor Onboarding',
        category: 'Procurement',

        before: [
            'Vendor submits onboarding form',
            'Ops team manually validates GST',
            'Bank account verification done manually',
            'Compliance documents checked manually',
            'Approval requested from finance',
            'Vendor activated manually in ERP',
        ],

        after: [
            'Document parser validates submissions',
            'GST verification API triggered',
            'Bank verification API triggered',
            'Compliance engine validates documents',
            'Approval engine handles exceptions',
            'ERP onboarding completed automatically',
        ],

        whatChanged: [
            'Removed manual document validation',
            'Introduced API verification services',
            'Reduced finance approval dependency',
            'Improved compliance reliability',
            'ERP activation automated',
        ],

        timeImpact: {
            before: '40–50 mins',
            after: '8–12 mins',
        },
    },

    {
        id: 'loan-approval',
        title: 'Loan Approval Processing',
        category: 'Banking',

        before: [
            'Customer submits loan request',
            'Bank officer reviews documents manually',
            'Credit history checked manually',
            'Income verification requested',
            'Approval request sent to manager',
            'Final decision communicated manually',
        ],

        after: [
            'Document parser extracts applicant data',
            'Credit bureau API validates score',
            'Income verification API checks salary history',
            'Risk engine computes approval confidence',
            'Auto-approval for low-risk applications',
            'Escalation only for risky applications',
            'Customer notified automatically',
        ],

        whatChanged: [
            'Removed manual credit verification',
            'Added risk scoring engine',
            'Auto-approved low-risk loans',
            'Reduced manager dependency',
            'Improved approval speed',
        ],

        timeImpact: {
            before: '60–90 mins',
            after: '12–20 mins',
        },
    },
];
