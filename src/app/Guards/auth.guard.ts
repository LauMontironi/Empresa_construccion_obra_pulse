import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  const publicRoutes = ['/home', '/login', '/register'];

  if (publicRoutes.includes(state.url)) {
    return true;
  }

  if (!token) {
    router.navigate(['/login']);

    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión para ver esta página',
      confirmButtonColor: '#ffc107',
    });

    return false;
  }

  return true;
};