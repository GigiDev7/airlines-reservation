import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin.component';
import { SideNavComponent } from './side-nav/side-nav.component';

@NgModule({
  declarations: [AdminComponent, SideNavComponent],
  imports: [MatIconModule],
  exports: [AdminComponent, SideNavComponent],
})
export class AdminModule {}
