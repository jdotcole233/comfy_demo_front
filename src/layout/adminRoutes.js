export default [
  {
    link: '/admin/',
    name: 'Dashboard',
    icon: 'bx bx-home-circle',
  },
  {
    link: '/admin/create-slip',
    name: 'Create Slip',
    icon: 'bx bxs-file-plus',
  },
  {
    link: '/admin/create-closing',
    name: 'Create Closing',
    icon: 'bx bx-lock-alt',
  },
  {
    link: '/admin/re-insurers',
    name: 'Re-insurers',
    icon: 'bx bx-group',
  },
  {
    link: '/admin/setup-business',
    name: 'Setup Business',
    icon: 'bx bx-group',
  },
  {
    link: '/admin/insurers',
    name: 'Insurers',
    icon: 'bx bx-group',
  },
  {
    link: '/admin/employees',
    name: 'Employees',
    icon: 'bx bx-home-circle',
  },
  {
    link: '/admin/reports',
    name: 'Reports',
    icon: 'bx bx-home-circle',
  },
];

const dashboard = [
  {
    link: '/admin/',
    name: 'Dashboard',
    icon: 'bx bx-home-circle',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
    functionalities: ['View Details', 'Preview Offer'],
  },
];

const menus = [
  {
    link: '/admin/',
    name: 'Settings',
    icon: 'bx bx-home-circle',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
    functionalities: ['Create role', 'Edit role', 'Configure Account Privilegese'],
  },
  {
    link: '/admin/',
    name: 'Profile',
    icon: 'bx bx-home-circle',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
    functionalities: ["View user account", "Manage Password", "View user log activities"],
  },
];

const offers = [
  {
    link: '/admin/create-slip/recent',
    name: 'Create Slip',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bxs-file-plus',
    functionalities: [
      'Create Slip',
      'View Offer',
      'Edit Offer',
      'Delete Offer',
      'View Comments',
    ],
  },
  {
    link: '/admin/approve-closing',
    name: 'Unapproved Closings',
    roles: [
      'CEO',
      'General Manager',
      // 'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bxs-file-plus',
    functionalities: [
      'Preview Cover Notes',
      'Preview Debit Note',
      'Credit Notes',
      'Generate Credit Note',
      'Approve',
      'Reopen Offer',
      'Delete offer',
    ],
  },
  {
    link: '/admin/create-closing/recent',
    name: 'Create Closing',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bx-lock-alt',
    functionalities: [
      'Manage Endorsement',
      'Reopen Offer',
      'Genereate Transfer Schedule (PDF)',
      'Download PDF for - Cover',
      'Download PDF for - Debit',
      'Download PDF for - Closing notes',
      'Delete offer'
    ],
  },
];
const clients = [
  {
    link: '/admin/insurers',
    name: 'Insurers',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bx-group',
    functionalities: [
      'Manage Insurer',
      'Manage insurer associates',
      'Manage facultative offers',
      'Manage treaties',
      'Manage fac. offer payments',
      'Manage treaty payments',
    ],
  },
  {
    link: '/admin/re-insurers',
    name: 'Re-insurers',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bx-group',
    functionalities: [
      'Facultative Data Analytics',
      'Treaty Data Analytics',
      'Manage reinsurers',
      'Manage reinsurer associates',
      'Manage Offers',
      'Manage Deductions',
      'Manage treaties',
      'Manage offer payments',
      'Manage treaty payments',
    ],
  },
];
const others = [
  {
    link: '/admin/setup-business',
    name: 'Setup Business',
    roles: [
      // 'CEO',
      // 'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bx-group',
    functionalities: [
      'Manage class of businesses',
      'Class of business analytics',
    ],
  },
  {
    link: '/admin/claims/recent',
    name: 'Claims',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bx-receipt',
    functionalities: [
      'Manage claim notifications',
      ' Manage claims', 'Preview Claim Debit Note', 'Download PDF Claim Debit Note', 'Email Claim Debit Note', 'Claim Data Analytic'],
  },
  {
    link: '/admin/employees',
    name: 'Employees',
    roles: [
      'CEO',
      'General Manager',
      // 'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bx-id-card',
    functionalities: [
      'Employee Onboarding',
      'Track Employee Log Activities',
      'Reset Employee Password',
      'Delete Employee Account',
    ],
  },
  {
    link: '/admin/reports',
    name: 'Reports',
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
    icon: 'bx bx-box',
    functionalities: ['Generate Dynamic reports on Facultative'],
  },
];

export const treaty = [
  {
    link: '/admin/treaty-programs',
    name: 'Treaty Programs',
    roles: ['CEO', 'Senior Broking Officer', 'System Administrator'],
    icon: 'bx bx-collection',
    functionalities: ["Manage Insurer treaty program", "Manage treaty deductions"],
  },
  {
    link: '/admin/treaty-claims',
    name: 'Treaty Claims',
    roles: ['CEO', 'Senior Broking Officer', 'System Administrator'],
    icon: 'bx bx-receipt',
    functionalities: ["Manage Non Proportional Claims"],
  },
]

export const deleteAccessRoles = [
  'General Manager',
  'CEO',
  'Senior Broking Officer',
  'System Administrator',
];
export const editAccessRoles = [
  'General Manager',
  'Senior Broking Officer',
  'Finance Executive',
  'CEO',
  'System Administrator',
];

const create_Access = [
  'General Manager',
  'Senior Broking Officer',
  // 'Finance Executive',
  'CEO',
  'System Administrator',
];

const create_insurer_access = [
  'System Administrator',
  'Senior Broking Officer',
];
const delete_insurer_access = [
  'System Administrator',
  'Senior Broking Officer',
];
const edit_insurer_access = ['System Administrator', 'Senior Broking Officer'];

const create_reinsurer_access = [
  'System Administrator',
  'Senior Broking Officer',
];
const delete_reinsurer_access = [
  'System Administrator',
  'Senior Broking Officer',
];
const edit_reinsurer_access = [
  'System Administrator',
  'Senior Broking Officer',
];

const Offers_Access = [
  'CEO',
  'General Manager',
  'Senior Broking Officer',
  'System Administrator',
];

const treaty_Access = ['CEO', 'Senior Broking Officer', 'System Administrator'];
const clients_Access = [
  'CEO',
  'General Manager',
  'Senior Broking Officer',
  'Finance Executive',
  'System Administrator',
];
const others_Access = [
  'CEO',
  'General Manager',
  'Senior Broking Officer',
  'Finance Executive',
  'System Administrator',
];

const insurer_offer_access = ['Finance Executive'];

export {
  clients,
  others,
  offers,
  dashboard,
  Offers_Access,
  clients_Access,
  others_Access,
  create_Access,
  create_insurer_access,
  delete_insurer_access,
  edit_insurer_access,
  insurer_offer_access,
  create_reinsurer_access,
  delete_reinsurer_access,
  edit_reinsurer_access,
  treaty_Access,
  menus
};
