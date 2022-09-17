import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/auth/security/token-storage.service';
import { JetonService } from 'src/app/services/jeton.service';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  invoices : any = [];
  jetonList: any = [];

  errorMessage: string;

  info: any;
  roles: string[];
  currentTime: number = 0;

  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username: string;
  userId;

  constructor(private jet:JetonService,
              private tokenService: TokenStorageService
  ){ }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.username = user.username;
      this.userId = user.id;
    }
    this.getJetonsList();
  }

  getJetonsList() {
    this.jet.getJetonsByCustomerIdByIdDesc(this.userId)
      .subscribe(res => {
        this.jetonList = res;
        $(function () {
          $("table").DataTable();
        });
      },
        error => this.errorMessage = <any>error);
  }

  OpenPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).open();
  }

  PrintPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).print();
  }

  DownloadPdf() {
    const document = this.getDocument();
    pdfMake.createPdf(document).download();
  }


  getDocument() {
    return {
      content: [
        {
          text: 'WOKITE SARL',
          fontSize: 15,
          alignment: 'center',
          color: '#0000ff',
          decoration: 'underline',
          style: 'name',
        },
        {
          text: ' Développement d’Applications – site Web',
          fontSize: 16,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Système et Infrastructure Informatiques',
          fontSize: 14,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Formation – Consultance - Audit',
          fontSize: 12,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'A Hann-Mariste 2 Lot N° 266 Dakar',
          fontSize: 10,
          bold: true,
          color: '#0000ff',
          alignment: 'center',
        },
        {
          text: 'Tél: +221 77 944 03 10 / Email: support@repareTout.com',
          fontSize: 9.5,
          bold: true,
          alignment: 'center',
          color: '#0000ff'
        },
        {

        },


        {
          columns: [

             [
              {
                text: `${this.jetonList[0].etat}`,
                fontSize: 15,
                bold: true,
                color: '#0000ff',
                margin: [0, 15, 0, 15]
              },
              {
                text: ' Facture de : ',
                fontSize: 11,
                color: '#0000ff',
                bold: true,
                margin: [0, 7, 0, 7]
              },
              {
                text: `Nom compltet : ${this.jetonList[0].utilisateur.name}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `Adresse : ${this.jetonList[0].utilisateur.addressRecruteur}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `Mobile : ${this.jetonList[0].utilisateur.mobile}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `Email : ${this.jetonList[0].utilisateur.email}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: `Entreprise : ${this.jetonList[0].utilisateur.nomEntreprise}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },
              {
                text: ` Secteur Activité : ${this.jetonList[0].utilisateur.secteurActivite}`,
                margin: [0, 5, 0, 5],
                fontSize: 11,
              },

            ],

            [
              {
                text: `Date : ${this.jetonList[0].createdDate.toLocaleString()}`,
                alignment: 'right',
                margin: [0, 15, 0, 15]
              },
            ],


          ]
        },

        {
          text: ' FACTURE ',
          alignment: 'center',
          fontSize: 12,
          color: '#0000ff',
          bold: true,
          margin: [0, 5, 0, 5]
        },
        {
          text: `N° : ${this.jetonList[0].numero}`,
          bold: true,
          fontSize: 12,
          alignment: 'center',
          color: '#0000ff',
          margin: [0, 8, 0, 8]
        },

        {
          columns: [

             [

              {
                text: ' ',
                fontSize: 11,
                color: '#0000ff',
                bold: true,
                margin: [0, 7, 0, 7]
              },
            ],

            [

              {
                text: ' ',
                fontSize: 11,
                color: '#0000ff',
                bold: true,
                margin: [0, 7, 0, 7]
              },

            ],


          ]
        },

        {

        },

  //      this.getListLigneCommandes(this.lcmdService.listData),
        {

        },

        {
          text: `Total F CFA : ${this.jetonList[0].montant}`,
          alignment: 'right',
          margin: [0, 8, 0, 8],
          bold: true,
          fontSize: 12,
        },

        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right',
          decoration: 'underline',
        },


      ],

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 14,
          bold: true
        },
        total: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          alignment: 'center'
        },

      }
    };

  }


}
