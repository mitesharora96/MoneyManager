import { Component, OnInit } from '@angular/core';
import {DbService} from '../db.service'
import {TransactionData} from '../transactions/typography.component'
import { Observable} from 'rxjs';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {

  selected = 'This_Month';
  transactionData:TransactionData[];
 // reportData:TransactionData[];
 BarChart=[];
 PieChart=[];

  constructor(private db :DbService) { }

 
  ngOnInit() {

    this.db.getTransactions().subscribe((data)=> {
      this.transactionData=data;
     console.log(`inside Report ${this.transactionData}`);
    
    
    },
    err => {
     console.log(err);
   }
  );

  this.OnTimeChange();
}

  // OnTimesChange(){
  //   console.log("Selction changed")
  //   //console.log(e.target.value);
  // }

  barchart(Axislabel,BarData){

    console.log("this is bar chart");
    console.log(BarData)
    this.BarChart = new Chart('barChart', {
      type: 'bar',
    data: {
     labels: Axislabel,
     datasets: [{
         label: '# stands for expenses',
         data: BarData,
         backgroundColor: [
             '#A569BD',
             '#16A085',
             '#F4D03F',
             '#5F6A6A',
             '#CB4335',
             '#212F3D'
         ],
         borderColor: [
          '#A569BD',
          '#16A085',
          '#F4D03F',
          '#5F6A6A',
          '#CB4335',
          '#212F3D'
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Timely Expense Chart",
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });

  }

  piechart(Axislabel,pieData){
    console.log("this is Pie chart");
    console.log(pieData)
    this.PieChart = new Chart('piechart', {
      type: 'pie',
    data: {
     labels: Axislabel,
     datasets: [{
         label: '# of Votes',
         data: pieData,
         backgroundColor: [
          '#A569BD',
          '#16A085',
          '#F4D03F',
          '#5F6A6A',
          '#CB4335',
          '#212F3D'
      ],
      borderColor: [
       '#A569BD',
       '#16A085',
       '#F4D03F',
       '#5F6A6A',
       '#CB4335',
       '#212F3D'
      ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Pie Chart",
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });
    
  }

  CategoryAmount(Rdata:TransactionData[]):any[]{

    let k=0;
    let CategoryCount=[0,0,0,0,0,0]
    while(k<Rdata.length)
    {
        let temp:any;
        
        if(Rdata[k].Category=='Electricity')
        {
          temp=Rdata[k].Amount
          CategoryCount[0]+=parseInt(temp);
        }
        else if(Rdata[k].Category=='Petrol')
        {
          temp=Rdata[k].Amount
          CategoryCount[1]+=parseInt(temp);
        }
        else if(Rdata[k].Category=='Rental')
        {
          temp=Rdata[k].Amount
          CategoryCount[2]+=parseInt(temp);
        }
        else if(Rdata[k].Category=='Shopping')
        {
          temp=Rdata[k].Amount
          CategoryCount[3]+=parseInt(temp);
        }
        else if(Rdata[k].Category=='Grocery')
        {
          temp=Rdata[k].Amount
          CategoryCount[4]+=parseInt(temp);
        }
        else{
          temp=Rdata[k].Amount
          CategoryCount[5]+=parseInt(temp);
        }
        k++;
    }
    return CategoryCount;
  }

  OnTimeChange(){
   let d=new Date(); 
   let currentMonth=d.getMonth();
   let currentYear=d.getFullYear();
   let reportData:TransactionData[]=[];
   let Month=['January','February','March','April','May','June','July','August','September','October','November','December']
   let Categories=['Electricity','Petrol','Rental','Shopping','Grocery','Others']
   let CatCount:any[];
    let i=0;
    
    while(i<this.transactionData.length){
      let dataDate= new Date(this.transactionData[i].Date);
      let dataMonth= dataDate.getMonth()
      let dataYear=dataDate.getFullYear();
  
      if(this.selected=='This_Month')
      {
            if(currentMonth==dataMonth)
           {
            reportData=reportData.concat(this.transactionData[i]);
           }
      }

      if(this.selected=='Last_Month')
      {
           if (dataMonth==(currentMonth-1))
           {
            reportData=reportData.concat(this.transactionData[i]);
           }
      }

      if(this.selected=='Last_3_Months')
      {
          if (dataMonth>(currentMonth-3))
         {
          reportData=reportData.concat(this.transactionData[i]);
          }
      }

      if(this.selected=='Last_6_Months')
      {
          if (dataMonth>(currentMonth-6))
         {
          reportData=reportData.concat(this.transactionData[i]);
          }
      }

     if(this.selected=='Last_1_year')
     {
           if(currentYear==dataYear)
          {
            reportData=reportData.concat(this.transactionData[i]);
          }
      }

      i++;
    
    }
    
    console.log(reportData);
    
   
      if(this.selected=='This_Month' || this.selected=='Last_Month')
      {
        let k=0;
        let week1count=0;
        let week2count=0;
        let week3count=0;
        let week4count=0;
        let week5count=0;
        while(k<reportData.length)
        {
          let dataDate= new Date(reportData[k].Date);
          let dataday= dataDate.getDate()
          let temp:any
            if(dataday>0 && dataday < 8)
            {
                temp=reportData[k].Amount
                week1count+=parseInt(temp);
            }
            else if(dataday>7 && dataday<15 )
            {
              temp=reportData[k].Amount
              week2count+=parseInt(temp);
            }
            else if(dataday>14 && dataday<22 )
            {
              temp=reportData[k].Amount
              week3count+=parseInt(temp);
            }
            else if(dataday>21 && dataday<29 )
            {
              temp=reportData[k].Amount
              week4count+=parseInt(temp);
            }
            else if(dataday>28)
            {
              temp=reportData[k].Amount
              week5count+=parseInt(temp);
            }
            k++;
        }

        let Weekcount=[week1count,week2count,week3count,week4count,week5count];
        let WeekData=['Week 1','Week 2','Week 3','Week 4','Week 5']
        this.barchart(WeekData,Weekcount)

        CatCount=this.CategoryAmount(reportData)
        this.piechart(Categories,CatCount);


      }

      else if(this.selected=='Last_3_Months')
      {
        let k=0;
        let Month1count=0;
        let Month2count=0;
        let Month3count=0;

        while(k<reportData.length)
        {
          let dataDate= new Date(reportData[k].Date);
          let dataMonth= dataDate.getMonth()
          let temp:any
          if(dataMonth==currentMonth-2)
          {
              temp=reportData[k].Amount
              Month1count+=parseInt(temp);

          }
          else if(dataMonth==currentMonth-1)
          {
            temp=reportData[k].Amount
            Month2count+=parseInt(temp);
          }
          else if(dataMonth==currentMonth)
          {
            temp=reportData[k].Amount
            Month3count+=parseInt(temp);
          }
          k++;
        }
        let MonthCount=[Month1count,Month2count,Month3count];
        let MonthData=[Month[currentMonth-2],Month[currentMonth-1],Month[currentMonth]]
        this.barchart(MonthData,MonthCount)

        CatCount=this.CategoryAmount(reportData)
        this.piechart(Categories,CatCount);
      }

      else if(this.selected=='Last_6_Months')
      {
        let k=0;
        let Month1count=0;
        let Month2count=0;
        let Month3count=0;
        let Month4count=0;
        let Month5count=0;
        let Month6count=0;

        while(k<reportData.length)
        {
          let dataDate= new Date(reportData[k].Date);
          let dataMonth= dataDate.getMonth()
          let temp:any
          if(dataMonth==currentMonth-5)
          {
              temp=reportData[k].Amount
              Month1count+=parseInt(temp);

          }
          else if(dataMonth==currentMonth-4)
          {
            temp=reportData[k].Amount
            Month2count+=parseInt(temp);
          }
          else if(dataMonth==currentMonth-3)
          {
            temp=reportData[k].Amount
            Month3count+=parseInt(temp);
          }
          else if(dataMonth==currentMonth-2)
          {
            temp=reportData[k].Amount
            Month4count+=parseInt(temp);
          }
          else if(dataMonth==currentMonth-1)
          {
            temp=reportData[k].Amount
            Month5count+=parseInt(temp);
          }
          else if(dataMonth==currentMonth)
          {
            temp=reportData[k].Amount
            Month6count+=parseInt(temp);
          }
          k++;
        }
        let MonthCount=[Month1count,Month2count,Month3count,Month4count,Month5count,Month6count];
        let MonthData=[Month[currentMonth-5],Month[currentMonth-4],Month[currentMonth-3],Month[currentMonth-2],Month[currentMonth-1],Month[currentMonth]]
        this.barchart(MonthData,MonthCount)

        CatCount=this.CategoryAmount(reportData)
        this.piechart(Categories,CatCount);
      }

      else if(this.selected=='Last_1_year')
      {
        let k=0;
        let monthcount=[0,0,0,0,0,0,0,0,0,0,0,0];
        while(k<reportData.length)
        {
          let dataDate= new Date(reportData[k].Date);
          let dataMonth= dataDate.getMonth()
          let temp:any
          let j=0;
          temp=reportData[k].Amount
          monthcount[dataMonth]+=parseInt(temp);
          k++;
          
        }
        
        this.barchart(Month,monthcount)

        CatCount=this.CategoryAmount(reportData)
        this.piechart(Categories,CatCount);
      }

  }

}
