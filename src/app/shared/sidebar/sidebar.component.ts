import { Role } from './../../model/roles';
import { Component, OnInit } from '@angular/core';
// Router Service
import { Router } from '@angular/router';
// Services
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  routeArr;
  userData;


  sidebarLinks = [
    {
      show: false,
      isActive: false,
      meta: 'dashboard',
      route: 'Dashboard',
      hasDropdown: false,
      link: '/admin/dashboard',
      inActiveIcon: 'assets/img/icons/dashboard_icon.png',
      activeIcon: 'assets/img/icons/dashboard_icon_active.png',
      
    },
    {
      link: null,
      show: false,
      meta: 'follow',
      isActive: false,
      hasDropdown: true,
      route: 'Follow Up',
      inActiveIcon: 'assets/img/icons/markunread_mail.png',
      activeIcon: 'assets/img/icons/markunread_mail_active.png',
      
      submenu: [
        {
          title: 'Urgent',
          sublinks: [
            { title: 'NCD', link: '/admin/follow/urgent/ncd' },
            { title: 'High Risk', link: '/admin/follow/urgent/high-risk' },
            { title: 'Roadtax', link: '/admin/follow/urgent/roadtax' },
          ],
        },
        {
          title: 'Assist',
          sublinks: [
            { title: 'NCD', link: '/admin/follow/assist/ncd' },
            {
              title: 'Market Value',
              link: '/admin/follow/assist/market-value',
            },
          ],
        },
      ],
    },
    {
      link: null,
      show: false,
      isActive: false,
      hasDropdown: true,
      meta: 'endorsement',
      route: 'Endorsement',
      inActiveIcon: 'assets/img/icons/thumb_up.png',
      activeIcon: 'assets/img/icons/thumb_up_active.png',
      
      submenu: [
        {
          title: 'Urgent',
          sublinks: [
            { title: 'NCD', link: '/admin/endorsement/urgent/ncd' },
            { title: 'High Risk', link: '/admin/endorsement/urgent/high-risk' },
            { title: 'Roadtax', link: '/admin/endorsement/urgent/roadtax' },
          ],
        },
        {
          title: 'Assist',
          sublinks: [
            { title: 'NCD', link: '/admin/endorsement/assist/ncd' },
            {
              title: 'Market Value',
              link: '/admin/endorsement/assist/market-value',
            },
          ],
        },
        {
          title: 'Payment',
          sublinks: [
            {
              title: 'Payment Failed',
              link: '/admin/endorsement/payment-fail',
            },
          ],
        },
      ],
    },
    {
      link: null,
      show: false,
      meta: 'claim',
      route: 'Claim',
      isActive: false,
      hasDropdown: true,
      inActiveIcon: 'assets/img/icons/verified.png',
      activeIcon: 'assets/img/icons/verified_active.png',
      
      submenu: [
        {
          title: null,
          sublinks: [{ title: 'Windscreen', link: '/admin/claim/windscreen' }],
        },
      ],
    },
    {
      link: null,
      show: false,
      isActive: false,
      meta: 'delivery',
      route: 'Delivery',
      hasDropdown: true,
      inActiveIcon: 'assets/img/icons/moped.png',
      activeIcon: 'assets/img/icons/moped_active.png',
      submenu: [
        {
          title: null,
          sublinks: [{ title: 'POS Office', link: null }],
        },
      ],
    },
    {
      show: false,
      meta: 'refund',
      route: 'Refund',
      isActive: false,
      hasDropdown: false,
      link: '/admin/refund',
      inActiveIcon: 'assets/img/icons/dollar_icon.png',
      activeIcon: 'assets/img/icons/dollar_icon_active.png'
    },
    {
      link: null,
      show: false,
      isActive: false,
      hasDropdown: true,
      meta: 'notifications',
      route: 'Notifications',
      inActiveIcon: 'assets/img/icons/maps_ugc.png',
      activeIcon: 'assets/img/icons/maps_ugc_active.png',
      
      submenu: [
        {
          title: null,
          sublinks: [
            { title: 'Template', link: '/admin/notifications/template' },
            { title: 'Schedule', link: '/admin/notifications/schedule' },
          ],
        },
      ],
    },
    {
      show: false,
      isActive: false,
      hasDropdown: false,
      meta: 'telemarketing',
      route: 'Telemarketing',
      link: '/admin/telemarketing',
      inActiveIcon: 'assets/img/icons/headset_mic.png',
      activeIcon: 'assets/img/icons/headset_mic_active.png'
     
    },
    {
      link: null,
      show: false,
      meta: 'report',
      route: 'Report',
      isActive: false,
      hasDropdown: true,
      inActiveIcon: 'assets/img/icons/content_icon.png',
      activeIcon: 'assets/img/icons/content_icon_active.png',
      
      submenu: [
        {
          title: null,
          sublinks: [{ title: 'Roadtax', link: '/admin/report/roadtax' }],
        },
      ],
    },
    {
      show: false,
      isActive: false,
      hasDropdown: false,
      meta: 'customer-database',
      route: 'Customer Database',
      link: '/admin/customer-database',
      inActiveIcon: 'assets/img/icons/folder_icon.png',
      activeIcon: 'assets/img/icons/folder_icon_active.png',
      userAccess: [1]
    },
    {
      show: false,
      meta: 'user',
      isActive: false,
      hasDropdown: false,
      link: '/admin/user',
      route: 'User Management',
      inActiveIcon: 'assets/img/icons/admin_user.png',
      activeIcon: 'assets/img/icons/admin_user_active.png',
      userAccess: [1]
    },
  ];

  constructor(private _route: Router, private _admin: AdminService) { }

  // LifeCycle Method
  ngOnInit(): void {
    this.routeArr = this._route.url.split('/');
    this.getAuthData();
    this.activateLink(this.routeArr[2]);
    this.authorrizedNavigation(this.sidebarLinks);
  }

  // Getting Data
  private getAuthData() {
    this.userData = this._admin.userData();
  }

  // Activating Link
  private activateLink(p) {
    let i = this.sidebarLinks.findIndex((item) => item.meta === p);
    i < 0
      ? null
      : (this.sidebarLinks[i].isActive = !this.sidebarLinks[i].isActive);

      // console.log('value i =>',i)
  }

  // Authorized Navigation Handler
  private authorrizedNavigation(a) {
    a.map((item) => {

      // console.log('master meta ===>', this.userData.roleName)
      // console.log('master item ===>', item)
      switch (this.userData.roleName) {
        case 'Finance':
          if (
            item.meta === 'dashboard' ||
            item.meta === 'endorsement' ||
            item.meta === 'follow' ||
            item.meta === 'user' ||
            item.meta === 'claim' ||
            item.meta === 'telemarketing' ||
            item.meta === 'report' ||
            item.meta === 'delivery' ||
            item.meta === 'notifications' ||
            item.meta === 'customer-database'
          ) {
            item.show = !item.show;
            console.log('finance item 1===>', item)
          }else{
          
            console.log('finance item 2===>', item)
           
          }
        
          break;

        case 'Supervisor':
          if (item.meta === 'refund') { item.show = !item.show; }
          break;

        case 'Administrator':

          break;

        case 'Telemarketing':
          if (
            item.meta === 'endorsement' ||
            item.meta === 'follow' ||
            item.meta === 'user' ||
            item.meta === 'claim' ||
            item.meta === 'refund' ||
            item.meta === 'report' ||
            item.meta === 'delivery' ||
            item.meta === 'notifications' ||
            item.meta === 'customer-database'
          ) {
            item.show = !item.show;

          }
          break;

        case 'Customer Service':
          if (
            item.meta === 'dashboard' ||
            item.meta === 'user' ||
            item.meta === 'refund' ||
            item.meta === 'notifications' ||
            item.meta === 'customer-database' ||
            item.meta === 'telemarketing'


          ) {
            item.show = !item.show;

          }
          break;

        default:
          break;
      }
    });
  }
}
