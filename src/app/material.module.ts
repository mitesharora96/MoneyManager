import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';


const MaterialsComponent=[
    MatButtonModule,
    MatTableModule
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