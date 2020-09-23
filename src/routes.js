import {lazy} from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const CreateSlip = lazy(() => import('./pages/CreateSlip'));
const ViewOffer = lazy(() => import('./pages/CreateSlip/ViewOffer'));
const CreateClosing = lazy(() => import('./pages/CreateClosing'));
const ReInsurers = lazy(() => import('./pages/ReInsurers'));
const SetupBusiness = lazy(() => import('./pages/SetUpBusiness'));
const Insurers = lazy(() => import('./pages/Insurers'));
const InsurersDetails = lazy(() => import('./pages/Insurers/InsurersDetail'));
const Reports = lazy(() => import('./pages/Reports'));
const Employees = lazy(() => import('./pages/Employees'));
const Claims = lazy(() => import('./pages/Claims'));
const ReinsurersDetails = lazy(() =>
  import('./pages/ReInsurers/ReinsurerDetail')
);
const Notifications = lazy(() => import('./pages/Notifications'));
const UnapprovedList = lazy(() => import('./pages/UnapprovedClosing'));

const Profile = lazy(() => import('./pages/profile'));
const Settings = lazy(() => import('./pages/Settings'));

export default [
  {
    path: '/',
    layout: '/admin',
    component: Dashboard,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/notifications',
    layout: '/admin',
    component: Notifications,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/profile',
    layout: '/admin',
    component: Profile,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/create-slip',
    layout: '/admin',
    component: CreateSlip,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/approve-closing',
    layout: '/admin',
    component: UnapprovedList,
    roles: ['Managing Director', 'Senior Broking Officer'],
  },
  {
    path: '/re-insurers',
    layout: '/admin',
    component: ReInsurers,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/insurers',
    layout: '/admin',
    component: Insurers,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/employees',
    layout: '/admin',
    component: Employees,
    roles: ['Managing Director', 'Senior Broking Officer'],
  },
  {
    path: '/reports',
    layout: '/admin',
    component: Reports,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/claims',
    layout: '/admin',
    component: Claims,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/insurers-details',
    layout: '/admin',
    component: InsurersDetails,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/re-insurers-detail',
    layout: '/admin',
    component: ReinsurersDetails,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/setup-business',
    layout: '/admin',
    component: SetupBusiness,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/create-closing',
    layout: '/admin',
    component: CreateClosing,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/view-offer',
    layout: '/admin',
    component: ViewOffer,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/settings',
    layout: '/admin',
    component: Settings,
    roles: [
      'Managing Director',
      'Senior Broking Officer',
      'Broking Officer',
      'Frontline Executive',
      'Finance Officer',
    ],
  },
  {
    path: '/',
    layout: '/auth',
    component: Login,
  },
  {
    path: '/create-password',
    layout: '/auth',
    component: ResetPassword,
  },
];
