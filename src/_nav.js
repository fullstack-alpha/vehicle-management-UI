import React from 'react';

let navButton = {
  items: [
    {
      name: 'Home',
      url: '/home',
      icon: 'fa fa-home',
      user: 'common'
    },
    {
      name: 'Vehicle Pass',
      url: '/theme/colors',
      icon: 'fa fa-car',
      user: 'common',
      children: [
        {
          name: 'New Request',
          url: '/base/newRequest',
          icon: 'fa fa-file',
          user: 'user',
        },
        {
          name: 'Request Status',
          url: '/base/requestStatus',
          icon: 'fa fa-clock-o',
          user: 'user',
        },
        {
          name: 'Issue Vehicle Pass',
          url: '/base/issue-pass',
          icon: 'fa fa-certificate',
          user: 'admin',
        }
      ]
    },
    {
      name: 'Parking Violation',
      url: '/theme/typography',
      icon: 'fa fa-ban',
      children: [
        {
          name: 'View',
          url: '/base/ParkingViolation',
          icon: 'fa fa-television',
          user: 'user',
        },
        {
          name: 'View',
          url: '/base/view-violationdetails',
          icon: 'fa fa-television',
          user: 'admin',
        },
        {
          name: 'Report Violation',
          url: '/base/reportviolation',
          icon: 'fa fa-pencil',
          user: 'admin',
        },
      ]
    },
    {
      name: 'Vehicle Parking',
      url: '/theme/breadcrumbs',
      icon: 'fa fa-truck',
      children: [
        {
          name: 'Available Slots',
          url: '/parking/parkingSlots',
          icon: 'fa fa-road',
          user: 'user',
        },
        {
          name: 'Parking Slots',
          url: '/parking/parkingSlots',
          icon: 'fa fa-motorcycle',
          user: 'admin',
        },
      ]
    }  
  ]
};

export default navButton;
