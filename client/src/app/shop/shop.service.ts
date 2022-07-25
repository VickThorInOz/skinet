import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/Models/brand';
import { IPagination } from '../shared/Models/Pagination';
import { IProductType } from '../shared/Models/ProductType';
import {map} from 'rxjs/operators';
import { ShopParams } from '../shared/Models/shopParams';
import { IProduct } from '../shared/Models/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){

    let params = new HttpParams();
    if (shopParams.brandId !== 0){
      params = params.append('BrandId', shopParams.brandId.toString());
    }
    if (shopParams.productType !==0){
      params = params.append('TypeId',shopParams.productType.toString());
    }

    if (shopParams.sort){
      params = params.append('sort', shopParams.sort);
    }

    if(shopParams.search){
      params = params.append('search', shopParams.search);
    }

    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl+'products',{observe: 'response', params})
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'products/'+ id);
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl+'products/brands');
  }

  getProductTypes(){
    return this.http.get<IProductType[]>(this.baseUrl+'products/types');
  }
}
