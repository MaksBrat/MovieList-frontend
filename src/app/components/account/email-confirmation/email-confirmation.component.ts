import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit  {
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;
  
  constructor(private accountService: AccountService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.confirmEmail();
  }
  
  private confirmEmail = () => {
    this.showError = this.showSuccess = false;
    const token = this.route.snapshot.queryParams['token'];
    const email = this.route.snapshot.queryParams['email'];

    this.accountService.confirmEmail(token, email)
      .subscribe({
        next: (_) => this.showSuccess = true,
        error: (err: HttpErrorResponse) => {
          this.showError = true;
          this.errorMessage = err.message;
        }
    })
  }
}
