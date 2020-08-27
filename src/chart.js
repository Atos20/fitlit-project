class ChartTemplate {
    constructor(type, title, data, border) {
    this.type = type,
    this.data = {
        labels: [],
        datasets: [{
            label: title,
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: ['', '', '', '', ''],
            borderWidth: border
        }]
    },
    this.options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  }
}
