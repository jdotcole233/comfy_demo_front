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

// New Component
const Brokers = lazy(() => import("./pages/Brokers"))
const BrokerDetails = lazy(() => import('./pages/BrokerDetails'))
const GenerateBrokerPaymentSchedule = lazy(() => import('./pages/BrokerGeneratePaymentSchedule'))
const CreateTreaty = lazy(() => import('./pages/CreateTreaty'))
const ManageTreatyDetails = lazy(() => import('./pages/ManageTreatyDetails'));
const DeletedOffers = lazy(() => import("./pages/DeletedOffers"))

export default [
  {
    path: '/',
    layout: '/admin',
    name: "Dashboard",
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
    name: "Notifications",
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
    name: "Profile",
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
    name: "Create Slip",
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
    name: "Create Slip",
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
    name: 'Unapproved Closings',
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
    path: '/reinstatement-offers',
    layout: '/admin',
    name: 'Reinstatement Offers',
    component: DeletedOffers,
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
    name: 'Re-insurers',
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
    name: 'Insurers',
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
    path: '/brokers',
    layout: '/admin',
    name: 'Reinsurance Brokers',
    component: Brokers,
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/brokers/details/:id',
    layout: '/admin',
    name: 'Reinsurance Brokers',
    component: BrokerDetails, // BrokerDetails
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/insurers-details/recent/:id/create-treaty',
    layout: '/admin',
    name: 'Insurers',
    component: CreateTreaty, // Create treaty page
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/insurers-details/recent/:id/generate-payment-schedule',
    layout: '/admin',
    name: 'Reinsurance Brokers',
    component: GenerateBrokerPaymentSchedule, // GenerateBrokerPaymentSchedule
    roles: [
      'CEO',
      'General Manager',
      'Senior Broking Officer',
      'Finance Executive',
      'System Administrator',
    ],
  },
  {
    path: '/insurers-details/all/:id/generate-payment-schedule',
    layout: '/admin',
    name: 'Reinsurance Brokers',
    component: GenerateBrokerPaymentSchedule, // GenerateBrokerPaymentSchedule
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
    name: 'Employees',
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
    name: 'Reports',
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
    name: 'Facultative Claims',
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
    name: 'Facultative Claims',
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
    name: 'Insurers',
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
    name: 'Insurers',
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
    name: 'Re-insurers',
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
    name: 'Re-insurers',
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
    name: 'Setup Business',
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
    name: 'Treaty Programs',
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
    name: 'Treaty Claims',
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
    name: 'Treaty Programs',
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
    path: "/treaty-programs/overview/manage/:payload",
    layout: "/admin",
    name: 'Treaty Programs',
    component: ManageTreatyDetails,
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
    name: 'Create Closing',
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
    name: 'Create Closing',
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
    name: 'Create Slip',
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
    name: 'Settings',
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
