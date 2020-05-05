import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { DataService } from "../service/user-data.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  dataToShow = "Load Data";
  dataShowSubsciption: Subscription;

  constructor(private userDataService: DataService) {}

  ngOnInit(): void {
    this.dataShowSubsciption = this.userDataService.userLoadedEmiiter.subscribe(
      (result) => {
        if (result) {
          this.dataToShow = "Refresh Data";
        } else {
          this.dataToShow = 'Load Data';
        }
      }
    );
  }
  ngOnDestroy() {
    this.dataShowSubsciption.unsubscribe();
  }
}
