import { Component } from "@angular/core";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent {
  constructor(private userService: UserService) {}
  user: any;
  userList: any[] = [];

  ngOnInit(): void {
    this.getUser();
    this.getUserList();
  }

  onLogin() {
    const { email, password } = this.getUserForm();
    this.userService.login({ email, password }).subscribe((status) => {
      console.log(status);
    });
  }

  getUser() {
    const userList = [{ name: "alberto" }, { name: "peludito" }];

    const userFormatedList = userList.find((user) => `hola, ${user.name}`);
    const userFormatedListv2 = userList.find((user) => {
      return `hola, ${user.name}`;
    });

    const userFormatedListv3 = userList.find((user) => {
      return {
        name: user.name,
      };
    });

    const userFormatedListv4 = userList.find((user) => ({
      name: user.name,
    }));

    this.userService.getProfileUser().subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }

  getUserList() {
    this.userService.getUserList().subscribe((list) => {
      this.userList = list;
      console.log(this.userList);
    });
  }

  getUserForm() {
    return {
      email: "juanjco2@gmail.com",
      password: "sdfas",
      browser: "chrome",
      captchaResponse: true,
    };
  }
}
