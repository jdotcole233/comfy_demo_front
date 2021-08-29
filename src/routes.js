import { lazy } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const CreateSlip = lazy(() => import('./pages/CreateSlip'));
const ViewOffer = lazy(() => import('./pages/CreateSlip/ViewOffer'));
const CreateClosing = lazy(() => import('./pages/CreateClosing'));
const ReInsurers = lazy(() => import('./pages/ReInsurers'));
const SetupBusiness = lazy(() => import('./pages/SetUpBusiness'));
const Insurers = lazy(() => import('./pages/Insurers'));
const InsurersDetails = lazy(() => import('./pages/Insurers/InsurerDetailsWrapper'));
const Reports = lazy(() => import('./pages/Reports'));
const Employees = lazy(() => import('./pages/Employees'));
const Claims = lazy(() => import('./pages/Claims'));
const ReinsurersDetails = lazy(() =>
  import('./pages/ReInsurers/ReinsurerDetailWrapper')
);
const Notifications = lazy(() => import('./pages/Notifications'));
const UnapprovedList = lazy(() => import('./pages/UnapprovedClosing'));

const Profile = lazy(() => import('./pages/profile'));
const Settings = lazy(() => import('./pages/Settings'));

const TreatyPrograms = lazy(() => import('./pages/TreatyPrograms'))
const TreatyProgramsOverview = lazy(() => import('./pages/Insurers/ViewTreatyWrapper'));
const TreatyClaims = lazy(() => import("./pages/TreatyClaims"))

export default [
  {
    path: '/',
    layout: '/admin',
    component: Dashboard,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/notifications',
    layout: '/admin',
    component: Notifications,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/profile',
    layout: '/admin',
    component: Profile,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/create-slip',
    layout: '/admin',
    component: CreateSlip,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/create-slip/:tab',
    layout: '/admin',
    component: CreateSlip,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/approve-closing',
    layout: '/admin',
    component: UnapprovedList,
    roles: [
      'CEO',
      'General Manager',
      // 'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/re-insurers',
    layout: '/admin',
    component: ReInsurers,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/insurers',
    layout: '/admin',
    component: Insurers,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/employees',
    layout: '/admin',
    component: Employees,
    roles: [
      'CEO',
      'General Manager',
      // 'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/reports',
    layout: '/admin',
    component: Reports,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/claims',
    layout: '/admin',
    component: Claims,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/claims/:tab',
    layout: '/admin',
    component: Claims,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/insurers-details',
    layout: '/admin',
    component: InsurersDetails,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/insurers-details/:tab',
    layout: '/admin',
    component: InsurersDetails,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/re-insurers-detail/:tab',
    layout: '/admin',
    component: ReinsurersDetails,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/re-insurers-detail',
    layout: '/admin',
    component: ReinsurersDetails,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/setup-business',
    layout: '/admin',
    component: SetupBusiness,
    roles: [
      // 'CEO',
      // 'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: "/treaty-programs",
    layout: "/admin",
    component: TreatyPrograms,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: "/treaty-claims",
    layout: "/admin",
    component: TreatyClaims,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: "/treaty-programs/overview",
    layout: "/admin",
    component: TreatyProgramsOverview,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/create-closing',
    layout: '/admin',
    component: CreateClosing,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/create-closing/:tab',
    layout: '/admin',
    component: CreateClosing,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/view-offer',
    layout: '/admin',
    component: ViewOffer,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      // 'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/settings',
    layout: '/admin',
    component: Settings,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
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
