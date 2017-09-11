import { Injectable, Component, OnInit } from '@angular/core';
export class ISupplier {

    SupplierDetailsID: number;
    Date: { get: Date; set: Date;}
    SupplierName: { get: string; set: string;}
    TotalAmount: {get: number; set: number; }
    AmountPaid: { get: number; set: number;}
    AmountDue: { get: number; set: number;}
    }