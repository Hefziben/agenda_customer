import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "home",
        children: [
          {
            path: "",
            loadChildren: () =>
              import("../pages/home/home.module").then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: "service-list",
        children: [
          {
            path: "",

            loadChildren: () =>
              import("../pages/service-list/service-list.module").then(
                m => m.ServiceListPageModule
              )
          }
        ]
      },
      {
        path: "booking",
        children: [
          {
            path: "",

            loadChildren: () =>
              import("../pages/booking/booking.module").then(
                m => m.BookingPageModule
              )
          }
        ]
      },
      {
        path: "notification",
        children: [
          {
            path: "",

            loadChildren: () =>
              import("../pages/notification/notification.module").then(
                m => m.NotificationPageModule
              )
          }
        ]
      },
      {
        path: "setting",
        children: [
          {
            path: "",

            loadChildren: () =>
              import("../pages/setting/setting.module").then(
                m => m.SettingPageModule
              )
          }
        ]
      },
      {
        path: "provide-list",
        children: [
          {
            path: "",

            loadChildren: () =>
              import("../pages/provide-list/provide-list.module").then(
                m => m.ProvideListPageModule
              )
          }
        ]
      },
      {
        path: "profile",
        children: [
          {
            path: "",

            loadChildren: () =>
              import("../pages/profile/profile.module").then(
                m => m.ProfilePageModule
              )
          }
        ]
      },
      {
        path: "",
        redirectTo: "/tabs/home",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
