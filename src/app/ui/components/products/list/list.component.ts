import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/common/models/product.service';
import { ActivatedRoute } from '@angular/router';
import { List_Product } from '../../../../contracts/list_product';
import { FileService } from '../../../../services/common/models/file.service';
import { BaseUrl } from '../../../../contracts/base_url';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fileService: FileService) { }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[];
  debugger;
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    
    this.activatedRoute.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalCount: number, products: List_Product[] } = await this.productService.read(this.currentPageNo - 1, this.pageSize,
        () => {

        },
        errorMessage => {

        });

      this.products = data.products;
      
      this.products = this.products.map<List_Product>(p => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles
        };
        return listProduct;
      });
      
      this.totalProductCount = data.totalCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];

      if (this.currentPageNo - 2 <= 0)
        for (let i = 1; i <= 5; i++)
          this.pageList.push(i);
      else if (this.currentPageNo + 2 >= this.totalPageCount)
        for (let i = this.totalPageCount - 4; i <= this.totalPageCount; i++)
          this.pageList.push(i);
      else
        for (let i = this.totalPageCount - 2; i <= this.totalPageCount + 2; i++)
          this.pageList.push(i);
    });
  }

}
