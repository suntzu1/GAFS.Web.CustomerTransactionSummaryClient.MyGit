import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/Services/loader-service';
import { LoaderState } from 'src/app/Models/loaderState';
@Component({
  selector: 'cts-progressloader',
  templateUrl: './progressloader.component.html',
  styleUrls: ['./progressloader.component.css']
})
export class ProgressloaderComponent implements OnInit {
  private subscription: Subscription;

  show = false;
  constructor(
    private loader: LoaderService
  ) {
  this.subscription = this.loader.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }

  ngOnInit() {
  }

}
