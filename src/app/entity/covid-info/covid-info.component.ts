import { Component, OnInit } from '@angular/core';
import {CovidInfo} from "../../models/CovidInfo";
import {CovidInfoService} from "../../service/covid-info.service";
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-covid-info',
  templateUrl: './covid-info.component.html',
  styleUrls: ['./covid-info.component.css']
})
export class CovidInfoComponent implements OnInit {
  public covidInfo: CovidInfo;
  public covidForm: FormGroup;

  constructor(private covidInfoService: CovidInfoService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.covidForm = this.createCovidForm();
    this.covidInfoService.getCovidInfo()
      .subscribe(data => {
        this.covidInfo = data;
        console.log(data);
      })
    console.log(this.getPersonsControls());
  }

  createCovidForm(): FormGroup {
    return this.fb.group({
      quarantine: [''],
      personListNew: this.fb.array([
        this.fb.group({
          name: [''],
          lastname: [''],
          father: [''],
          address: [''],
          phone: ['']
        })
      ])
    });
  }

  getPersonsControls() {
    return (this.covidForm.get('personListNew') as FormArray).controls;
  }


  addCovid(): void {
    this.covidInfoService.addCovidInfo({
      department : 1,
      quarantine : this.covidForm.value.quarantine,
      personListNew : [
        {
          name : 'Вася',
          lastname : 'Котов',
          father : 'Петрович',
          address : 'Москва',
          phone : '8911'
        }
      ]
    }).subscribe(data => {
      console.log(data);
    })
  }
}
