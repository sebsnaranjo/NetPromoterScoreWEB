import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const loginAdminGuard = () => {

    const router = inject(Router);

    var role = sessionStorage.getItem('role');
    var roleNumber = Number(role);
    if(roleNumber == 2){
        return true;
    } else {
        router.navigate(['/home'])
        return false;
    }
}