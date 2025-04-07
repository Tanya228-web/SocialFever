import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    

    // withCredentials: true
  });
  console.log(clonedRequest)
  return next(clonedRequest);
};
