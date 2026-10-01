// The lib now imports runtime values (HttpResponse, HttpEventType) from @angular/common/http,
// whose partially-compiled factories need the JIT compiler facade when run outside the Angular CLI.
import '@angular/compiler';
