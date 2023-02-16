import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RegistrationComponent } from './registration/registration.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { InviteComponent } from './invite/invite.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { VideosComponent } from './videos/videos.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalDocumentComponent } from './legal-document/legal-document.component';
import { NetworkComponent } from './network/network.component';
import { ShowTreeViewComponent } from './show-tree-view/show-tree-view.component';
import { TreeView2Component } from './tree-view2/tree-view2.component';
import { ApplyFlitersComponent } from './apply-fliters/apply-fliters.component';
import { FilterResultComponent } from './filter-result/filter-result.component';
import { EarningsComponent } from './earnings/earnings.component';
import { TotalEarningsComponent } from './total-earnings/total-earnings.component';
import { GenerateEpinComponent } from './generate-epin/generate-epin.component';
import { TransferEpinComponent } from './transfer-epin/transfer-epin.component';
import { SuccessEpinComponent } from './success-epin/success-epin.component';
import { UpgradeSubscriptionComponent } from './upgrade-subscription/upgrade-subscription.component';
import { AboutService } from './services/about.service';
import {AngularFireModule} from '@angular/fire/compat'
import { FormsModule } from '@angular/forms';
import { InviteRightComponentComponent } from './invite-right-component/invite-right-component.component';
import { InviteLeftComponentComponent } from './invite-left-component/invite-left-component.component';
import { UiCardComponent } from './ui-card/ui-card.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { AwarenessCompaignComponent } from './awareness-compaign/awareness-compaign.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    DashboardComponent,
    SideMenuComponent,
    RegistrationComponent,
    CoursesComponent,
    LoginComponent,
    PaymentComponent,
    PricingComponent,
    ContactComponent,
    InviteComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    TreeViewComponent,
    VideosComponent,
    PrivacyPolicyComponent,
    LegalDocumentComponent,
    NetworkComponent,
    ShowTreeViewComponent,
    TreeView2Component,
    ApplyFlitersComponent,
    FilterResultComponent,
    EarningsComponent,
    TotalEarningsComponent,
    GenerateEpinComponent,
    TransferEpinComponent,
    SuccessEpinComponent,
    UpgradeSubscriptionComponent,
    InviteRightComponentComponent,
    InviteLeftComponentComponent,
    UiCardComponent,
    BankDetailsComponent,
    AwarenessCompaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule
  ],
  providers: [AboutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
