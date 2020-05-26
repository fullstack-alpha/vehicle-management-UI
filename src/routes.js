import React from 'react';

const Home = React.lazy(() => import('./views/Home/Home'));
const Profile = React.lazy(() => import('./containers/User/Profile'));
const IssuePass = React.lazy(() => import('./containers/IssuePass/IssuePass'));
const RequestStatus = React.lazy(() => import('./views/Base/RequestStatus'));
const NewRequest = React.lazy(() => import('./views/Base/NewRequest'));
const ParkingSlots =React.lazy(() => import('./containers/VehicleParking/ParkingSlots'));
const ViolationDetailsAG = React.lazy(() =>
  import("./containers/ViolationDetails/ViolationDetailsAG")
);
const ParkingViolation = React.lazy(() =>
  import("./views/Base/ParkingViolation")
);
const ReportViolation = React.lazy(() =>
  import("./views/Base/ReportViolation")
);

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/profile', exact:true, name: 'Profile', component: Profile },
  { path: '/parking/parkingSlots', exact: true, name: 'Parking Slots', component: ParkingSlots},
  { path: '/base/issue-pass', exact: true, name: 'Issue Vehicle Pass', component: IssuePass },
  { path: '/base/newRequest', name: 'New Request', component: NewRequest },
  { path: '/base/requestStatus', name: 'Request Status', component: RequestStatus },
    {
      path: "/base/view-violationdetails",
      exact: true,
      name: "View Violation Details",
      component: ViolationDetailsAG,
    },
    {
      path: "/base/ParkingViolation",
      exact: true,
      name: "View User Violation Details",
      component: ParkingViolation,
    },
    {
      path: "/base/ReportViolation",
      exact: true,
      name: "Report Violation Details",
      component: ReportViolation,
    }

];

export default routes;
