import { Injectable, Component, OnInit } from '@angular/core';
import { IEmpRole } from '../empRole/empRole.data';

export interface IEmployee {
     EmpID: number;
     FirstName: { get: string; set: string; }
     LastName: { get: string; set: string; }
     EmpRole: { get: string; set: string; }
     Phone: { get: string; set: string; }
     Email: { get: string; set: string; }
     UserName: { get: string; set: string; }
     Password: { get: string; set: string; }
}