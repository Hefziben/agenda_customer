import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'slide',
    loadChildren: () =>
      import('./pages/slide/slide.module').then(m => m.SlidePageModule)
  },
  {
    path: 'service-list',
    loadChildren: () =>
      import('./pages/service-list/service-list.module').then(
        m => m.ServiceListPageModule
      )
  },
  {
    path: 'provide-list',
    loadChildren: () =>
      import('./pages/provide-list/provide-list.module').then(
        m => m.ProvideListPageModule
      )
  },
  {
    path: 'provider-detail',
    loadChildren: () =>
      import('./pages/provider-detail/provider-detail.module').then(
        m => m.ProviderDetailPageModule
      )
  },
  {
    path: 'service-detail',
    loadChildren: () =>
      import('./pages/service-detail/service-detail.module').then(
        m => m.ServiceDetailPageModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./pages/setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'notification',
    loadChildren: () =>
      import('./pages/notification/notification.module').then(
        m => m.NotificationPageModule
      )
  },
  {
    path: 'history',
    loadChildren: () =>
      import('./pages/history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./pages/booking/booking.module').then(m => m.BookingPageModule)
  },
  {
    path: 'like-page/:id',
    loadChildren: () =>
      import('./pages/like-page/like-page.module').then(
        m => m.LikePagePageModule
      )
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./pages/payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () =>
      import('./pages/forgot/forgot.module').then(m => m.ForgotPageModule)
  },
  {
    path: 'post-status',
    loadChildren: () =>
      import('./pages/post-status/post-status.module').then(
        m => m.PostStatusPageModule
      )
  },
  {
    path: 'change-password',
    loadChildren: () =>
      import('./pages/change-password/change-password.module').then(
        m => m.ChangePasswordPageModule
      )
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./pages/address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'address-detail',
    loadChildren: () => import('./pages/address-detail/address-detail.module').then( m => m.AddressDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
