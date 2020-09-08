const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

const baseUrl = 'http://localhost:3000/';
const fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  KhmerOSBTB: {
    normal: 'KhmerOS_battambang.ttf',
  },
  KhmerOSMuollight: {
    normal: 'KhmerOS_muollight.ttf',
  },
  TACTENG: {
    normal: 'TACTENG.TTF',
  }
}

function dateConverted(rawDate) {
  const d = new Date(rawDate);
  const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(d)
  const mo = new Intl.DateTimeFormat('en', {month: 'short'}).format(d)
  const da = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(d)
  return `${da}-${mo}-${ye}`;
}

function isUnicodeFunc(string) {
  let isKhmer = true;
  for (let i = 0; i < string.length; i++) {
    let code = string.charCodeAt(i);
    if (code < 0x1780 || (code > 0x17FF && code < 0x19E0) || code > 0x19FF) {
      isKhmer = false;
      break;
    }
  }
  return isKhmer;
}

export async function printStock({commit}, data) {
  const dt = data.data[0];
  toDataURL(baseUrl + 'files/1592146267210-hoodie-guy-with-wings-kx.jpg', function (dataUrl) {
    toDataURL(baseUrl + 'files/1592147824289-anonims-anonymous-machine-gun-wallpaper-preview.jpg', function (dt) {
      const documentDefinition = {
        pageSize: 'A4',
        pageMargins: [5, 10, 5, 10],
        content: [
          {text: 'Oh My Good'},
          {image: dataUrl, width: 200},
          {image: dt, width: 200}
        ],
      };
      const pdfDoc = pdfMake.createPdf(documentDefinition, null, fonts);
      pdfDoc.print();
    });
  });
}

export async function autoPrintSale({commit}, data) {
  try {
    let pt = data.data.patient_obj;
    let dt = data.data;
    let tb_body = [];
    console.log(pt)
    tb_body.push([
      {text: 'ល.រ', style: 'tbh'},
      {text: 'ថ្នាំ', style: 'tbh'},
      {text: 'ចំនួន', style: 'tbh'},
      {text: 'តម្លៃ', style: 'tbh'}
    ]);
    for (let i = 0; i < data.detail.length; i++) {
      let dd = data.detail[i];
      tb_body.push([
        {text: i + 1, fontSize: 10},
        {text: dd.product_obj.name, style: isUnicodeFunc(dd.product_obj.name) === true ? 'tbbKh' : 'tbbEn'},
        {text: dd.sale_qty, fontSize: 10},
        {text: '$' + (dd.sale_qty * dd.sale_price).toFixed(2), fontSize: 10}
      ])
    }
    let documentDefinition = {
      pageSize: {
        width: 302.36220472,
        height: 'auto'
      },
      pageMargins: [10, 0, 10, 20],
      content: [
        {text: 'ពិគ្រោះពិនិត្យ ព្យាបាលជំងឺទូទៅ', margin: [0, 10, 0, 0], style: 'hd'},
        {text: 'r(0)s', style: 'hdd'},
        {text: 'អ្នកទិញ៖ ' + pt.kh_name, style: 'pt'},
        {text: 'ចំនួន៖ ' + data.detail.length + ' មុខ', style: 'pt'},
        {
          columns: [
            {text: 'តម្លៃសរុប៖ $' + dt.amount.toFixed(2), style: 'pt'},
            {
              text: 'Date: ' + dateConverted(dt.sale_date),
              alignment: 'right',
              style: 'pt'
            },
          ]
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['auto','*','auto','auto'],
            body: tb_body,
            alignment: 'center'
          }
        },
        {text: '_________', alignment: 'center'},
        {text: 'អាសយដ្ឋានៈ ភូមិកំពង់ក្តី២ ឃុំកំពង់ក្ដី ស្រុកជីក្រែង ខេត្តសៀមរាប', style: 'addr'},
        {text: 'ទូរស័ព្ទៈ ០១២ ៥៥៥៥ ៨៧ ឬ ០១២ ៣៩៩ ៩០៣', fontSize: 7, style: 'addr' },

      ],
      styles: {
        hd: {
          font: 'KhmerOSMuollight', fontSize: 16, alignment: 'center'
        },
        hdd: {
          font: 'TACTENG', fontSize: 12, alignment: 'center'
        },
        pt: {
          font: 'KhmerOSBTB', fontSize: 10, alignment: 'left'
        },
        tbh: {
          font: 'KhmerOSBTB', fontSize: 10,
        },
        tbbEn: {
          font: 'Roboto', fontSize: 10,
        },
        tbbKh: {
          font: 'KhmerOSBTB', fontSize: 10,
        },
        addr: {
          alignment: 'center',
          pageBreak: 'before',
          font: 'KhmerOSBTB', fontSize: 7,
        },
      }
    };
    const pdfDoc = pdfMake.createPdf(documentDefinition, null, fonts);
    pdfDoc.print();
  }catch (e) {
    console.log(e)
  }
}
export async function printSale({commit}, data) {
  console.log(data)
  let pt = data.data[0].patient;
  let dt = data.data[0];
  let dtt = data.detail;
  let tb_body = [];
  tb_body.push([
    {text: 'ល.រ', style: 'tbh'},
    {text: 'ថ្នាំ', style: 'tbh'},
    {text: 'ចំនួន', style: 'tbh'},
    {text: 'តម្លៃ', style: 'tbh'}
    ]);
  for (let i = 0; i < dtt.length; i++) {
    let dd = dtt[i];
    tb_body.push([
      {text: i + 1, fontSize: 10},
      {text: dd.product.name, style: isUnicodeFunc(dd.product.name) === true ? 'tbbKh' : 'tbbEn'},
      {text: dd.sale_qty, fontSize: 10},
      {text: '$' + (dd.sale_qty * dd.sale_price).toFixed(2), fontSize: 10}
    ])
  }
  let documentDefinition = {
    pageSize: {
      width: 302.36220472,
      height: 'auto'
    },
    pageMargins: [10, 0, 10, 20],
    content: [
      {text: 'ពិគ្រោះពិនិត្យ ព្យាបាលជំងឺទូទៅ', margin: [0, 10, 0, 0], style: 'hd'},
      {text: 'r(0)s', style: 'hdd'},
      {text: 'អ្នកទិញ៖ ' + pt.kh_name, style: 'pt'},
      {text: 'ចំនួន៖ ' + dtt.length + ' មុខ', style: 'pt'},
      {
        columns: [
          {text: 'តម្លៃសរុប៖ $' + dt.amount.toFixed(2), style: 'pt'},
          {
            text: 'Date: ' + dateConverted(dt.sale_date),
            alignment: 'right',
            style: 'pt'
          },
        ]
      },
      {
        layout: 'lightHorizontalLines', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['auto','*','auto','auto'],
          body: tb_body,
          alignment: 'center'
        }
      },
      {text: '_________', alignment: 'center'},
      {text: 'អាសយដ្ឋានៈ ភូមិកំពង់ក្តី២ ឃុំកំពង់ក្ដី ស្រុកជីក្រែង ខេត្តសៀមរាប', style: 'addr'},
      {text: 'ទូរស័ព្ទៈ ០១២ ៥៥៥៥ ៨៧ ឬ ០១២ ៣៩៩ ៩០៣', fontSize: 7, style: 'addr' },

    ],
    styles: {
      hd: {
        font: 'KhmerOSMuollight', fontSize: 16, alignment: 'center'
      },
      hdd: {
        font: 'TACTENG', fontSize: 12, alignment: 'center'
      },
      pt: {
        font: 'KhmerOSBTB', fontSize: 10, alignment: 'left'
      },
      tbh: {
        font: 'KhmerOSBTB', fontSize: 10,
      },
      tbbEn: {
        font: 'Roboto', fontSize: 10,
      },
      tbbKh: {
        font: 'KhmerOSBTB', fontSize: 10,
      },
      addr: {
        alignment: 'center',
        pageBreak: 'before',
        font: 'KhmerOSBTB', fontSize: 7,
      },
    }
  };
  const pdfDoc = pdfMake.createPdf(documentDefinition, null, fonts);
  pdfDoc.print();
}
