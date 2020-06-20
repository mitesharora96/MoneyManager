import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';


const MaterialsComponent=[
    MatButtonModule,
    MatTableModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule
]



@NgModule({
    imports: [
        MaterialsComponent
    ],

    exports:[
        MaterialsComponent
    ]
})

    export class MaterialModule{}