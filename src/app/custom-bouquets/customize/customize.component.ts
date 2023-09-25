import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BouquetService } from 'src/app/bouquets/bouquet.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {

  constructor(private bouquetService: BouquetService,
    public routing:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
