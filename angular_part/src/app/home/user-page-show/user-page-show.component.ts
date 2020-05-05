import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/service/user-data.service";

@Component({
  selector: "app-user-page-show",
  templateUrl: "./user-page-show.component.html",
  styleUrls: ["./user-page-show.component.css"],
})
export class UserPageShowComponent implements OnInit {
  constructor(private userDataService: DataService) {}
  dataLinkProvider = this.userDataService.getUsers();

  ngOnInit(): void {
    this.userDataService.userLoadedEmiiter.next(true);
  }
}
