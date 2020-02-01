const form = document.forms.coeficientsGetter;
const coeficients = document.querySelectorAll('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  outPutPrinter(rootsFinder());
  drawGoogleChart();
});

form.onkeyup = function (e) {
  e = e || window.event;
  if (e.keyCode === 13) {
    outPutPrinter(rootsFinder());
  }
  // отменяем действие браузера
  return false;
}



function outPutPrinter(text) {
  const outPut = document.getElementById('output');
  outPut.innerHTML = text;
  outPut.classList.remove('d-none');

}


for (let i = 0; i < coeficients.length; i++) {
  coeficients[i].addEventListener('keypress', validateInput)
}

function validateInput(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]|\.|\-/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

function rootsFinder() {
  const a = +form.a.value;
  const b = +form.b.value;
  const c = +form.c.value;

  const D = b ** 2 - 4 * a * c;

  if (a === 0 && b === 0) {
    return 'Сначала введите коэффициенты!'
  }
  if (a === 0) {
    return 'Это не квадратное уравнение! Но решение есть: X= ' + (-c / b)
  }

  if (D < 0) {
    return 'D < 0  - Вещественных корней нет'
  } else if (D == 0) {
    return 'D = 0 - Уравнение имеет один вещественный корень(или же два совпадающих вещественных корня): X = ' +
      (-b / 2 * a) + '.'
  } else {
    const firstX = ((-b + Math.sqrt(D)) / 2 * a);
    const secondX = ((-b - Math.sqrt(D)) / 2 * a);
    return `D > 0  - Уравенение имеет два различных вещественных корня:<br> X<sub>1</sub> = ${firstX}; <br> X<sub>2</sub> = ${secondX}. `
  }
}

// это вставлен график из GoogleChart

function drawGoogleChart() {
  google.charts.load('current', {
    'packages': ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

  const chartBox = document.getElementById('chartBox');
  

  function createData() {
    const a = +form.a.value;
    const b = +form.b.value;
    const c = +form.c.value;
    var dataArray = [
      ['X', 'Y']
    ];

    for (let i = 1; i <= 21; i++) {
      const x = (i - 11) * 10;
      const y = a * x ** 2 + b * x + c;
      dataArray[i] = [`${[x]}`, +[y]]
    }
    return dataArray;
  }


  function drawChart() {
    var data = google.visualization.arrayToDataTable(createData());

    var options = {
      title: 'Функция Y(x)',
      curveType: 'function',
      legend: {
        position: 'bottom'
      }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);

    if (!(+form.a.value === 0 && +form.b.value === 0)) {
    chartBox.classList.remove('d-none')}
  }
}