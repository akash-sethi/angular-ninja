import {Directive, OnInit, TemplateRef, ViewContainerRef, Input} from '@angular/core';
import {UserService} from './services';

@Directive({
  selector: '[appIsAuth]'
})
export class IsAuthDirective implements OnInit {

  constructor(private userService: UserService,
              private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  condition: boolean;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(isAuthenticated => {
      if ((isAuthenticated && this.condition) || (!isAuthenticated && !this.condition)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input() set appIsAuth(condition: boolean) {
    this.condition = condition;
  }
}
