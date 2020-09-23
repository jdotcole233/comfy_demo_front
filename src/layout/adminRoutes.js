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
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
];

const offers = [
  {
    link: '/admin/create-slip',
    name: 'Create Slip',
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
    icon: 'bx bxs-file-plus',
  },
  {
    link: '/admin/approve-closing',
    name: 'Unapproved Closings',
    roles: ['Managing Director', 'Senior Broking Officer'],
    icon: 'bx bxs-file-plus',
  },
  {
    link: '/admin/create-closing',
    name: 'Create Closing',
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
    icon: 'bx bx-lock-alt',
  },
];
const clients = [
  {
    link: '/admin/insurers',
    name: 'Insurers',
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
    icon: 'bx bx-group',
  },
  {
    link: '/admin/re-insurers',
    name: 'Re-insurers',
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
    icon: 'bx bx-group',
  },
];
const others = [
  {
    link: '/admin/setup-business',
    name: 'Setup Business',
    roles: ['Managing Director', 'Senior Broking Officer'],
    icon: 'bx bx-group',
  },
  {
    link: '/admin/claims',
    name: 'Claims',
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
    icon: 'bx bx-receipt',
  },
  {
    link: '/admin/employees',
    name: 'Employees',
    roles: ['Managing Director', 'Senior Broking Officer'],
    icon: 'bx bx-id-card',
  },
  {
    link: '/admin/reports',
    name: 'Reports',
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
    icon: 'bx bx-box',
  },
];

export const deleteAccessRoles = [
  'Managing Director',
  'Senior Broking Officer',
];
export const editAccessRoles = [
  'Managing Director',
  'Senior Broking Officer',
  'Broking Officer',
  'Frontline Executive',
  'Finance Officer',
];

export {clients, others, offers, dashboard};
