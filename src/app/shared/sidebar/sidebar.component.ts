import { Component, OnInit } from '@angular/core';
// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  routeArr;
  sidebarLinks = [
    {
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
      ],
    },
    {
      link: null,
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
      meta: 'refund',
      route: 'Refund',
      isActive: false,
      hasDropdown: false,
      link: '/admin/refund',
      inActiveIcon: 'assets/img/icons/dollar_icon.png',
      activeIcon: 'assets/img/icons/dollar_icon_active.png',
    },
    {
      link: null,
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
      isActive: false,
      hasDropdown: false,
      meta: 'telemarketing',
      route: 'Telemarketing',
      link: '/admin/telemarketing',
      inActiveIcon: 'assets/img/icons/headset_mic.png',
      activeIcon: 'assets/img/icons/headset_mic_active.png',
    },
    {
      link: null,
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
      isActive: false,
      hasDropdown: false,
      meta: 'customer-database',
      route: 'Customer Database',
      link: '/admin/customer-database',
      inActiveIcon: 'assets/img/icons/folder_icon.png',
      activeIcon: 'assets/img/icons/folder_icon_active.png',
    },
    {
      meta: 'user',
      isActive: false,
      hasDropdown: false,
      link: '/admin/user',
      route: 'User Management',
      inActiveIcon: 'assets/img/icons/admin_user.png',
      activeIcon: 'assets/img/icons/admin_user_active.png',
    },
  ];

  constructor(private _route: Router) {}

  // LifeCycle Method
  ngOnInit(): void {
    this.routeArr = this._route.url.split('/');
    this.activateLink(this.routeArr[2]);
  }

  // Activating Link
  private activateLink(p) {
    let i = this.sidebarLinks.findIndex((item) => item.meta === p);
    i < 0
      ? null
      : (this.sidebarLinks[i].isActive = !this.sidebarLinks[i].isActive);
  }
}
