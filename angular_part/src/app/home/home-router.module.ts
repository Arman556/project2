import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NgModule } from "@angular/core";
import { DefaultPageComponent } from "./default-page/default-page.component";
import { NewUserComponent } from "./new-user/new-user.component";
import { CustomerPageComponent } from "./customer/customer-page/customer-page.component";
import { UserPageShowComponent } from "./user-page-show/user-page-show.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", component: DefaultPageComponent },
      { path: "users", component: UserPageShowComponent },
      { path: "new-user", component: NewUserComponent },
      { path: "customers", component: CustomerPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRouterModule {}
