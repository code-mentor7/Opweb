import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api/api.service';
import {MeService} from '../../me.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reports: any[] = [];
  constructor(private api: ApiService, private me: MeService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.me.user.client_id === 'ADMIN') {
      this.api.report.getAll().promise()
        .then(rsp => {
          this.reports = rsp;
        });
    } else {
      this.api.report.getReport(this.me.user.client_id).promise()
        .then(rsp => {
          this.reports = rsp;
        });
    }
  }

  onDownload(report) {
    const url = '/api/report/' + report.report_id_num;
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'report.pdf';
    a.style.display = 'none';
    a.target = '_self';
    a.click();
    document.body.removeChild(a);
  }

}
