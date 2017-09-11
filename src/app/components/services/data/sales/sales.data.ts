import { Injectable, Component, OnInit } from '@angular/core';



export interface ISale {

    SaleID: number;
    Date: { get: Date; set: Date; }
    FtposAmount: { get: number; set: number; }
    CashAmount:{ get: number; set: number; }
    BlueBoxAmount: { get: number; set: number; }
    CashLeft: { get: number; set: number; }
    TotalSale: { get: number; set: number; }
    }
