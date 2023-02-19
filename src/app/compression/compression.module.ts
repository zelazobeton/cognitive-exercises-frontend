import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CompressionInterceptor} from './interceptor/compress-interceptor.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CompressionInterceptor,
      multi: true
    }
  ],
  exports: []
})
export class CompressionModule {
}