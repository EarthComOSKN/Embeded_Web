import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['degree', 'labal', 'earth'],
  computed: {
    Chartdegree: function () {
      return this.degree
    },
    Chartlabal: function () {
      return this.labal
    }
  },
  watch: {
    labal: function () {
      this.renderTempChart()
    },
    degree: function () {
      // console.log(chart);
      // this.chart.destroy();
      this.renderTempChart()
    }
  },
  methods: {
    renderTempChart () {
      this.renderChart({
        labels: this.Chartlabal,
        datasets: [
          {
            label: 'Temperature Graph',
            backgroundColor: 'rgba(255,0,0,0.3)',
            data: this.Chartdegree
          }
        ]
      },{
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0
          },
          scales: {
            yAxes: [{
                    display: true,
                    ticks: {
                        min: 20,
                        steps: 30,
                        stepValue: 1,
                        max: 50
                    }
                }]
          },
        }
      )
    }
  },
  mounted () {
    this.renderTempChart()
  }
}
