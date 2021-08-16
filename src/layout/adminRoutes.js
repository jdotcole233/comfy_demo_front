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
  },
];

export const treaty = [
  {
    link: '/admin/treaty-programs',
    name: 'Treaty Programs',
    roles: ['CEO', 'Senior Broking Officer', 'System Administrator'],
    icon: 'bx bx-collection',
  },
  {
    link: '/admin/treaty-claims',
    name: 'Treaty Claims',
    roles: ['CEO', 'Senior Broking Officer', 'System Administrator'],
    icon: 'bx bx-receipt',
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
  treaty_Access
};
