<template>
  
  <div class="content">
    <div  class="container-fluid">
      <div  class="row">
        <div class="col-md-8">
          <card>
            <template slot="header">
              <h4 class="card-title">Temperature Statistics</h4>
            </template>
            <temp-chart :labal="labal" :degree="degree" ></temp-chart>
          </card>
        </div>
        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">Temperature Statistics</h4>
              <p class="card-category">Last Temperature</p>
            </template>
            <div class="container center" >
              <div class="row center">
                <div class="col cc">
                  {{parseInt(degree[degree.length-1])}}°C
                </div>
                <div class="col ci">
                  <div class="container">
                    <div class="row" style="color:red">↑ {{ parseInt(degree[degree.length-2]) - parseInt(degree[degree.length-1]) > 0 ? 0 : parseInt(degree[degree.length-1]) - parseInt(degree[degree.length-2])}}</div>
                    <div class="row" style="color:blue">↓ {{ parseInt(degree[degree.length-2]) - parseInt(degree[degree.length-1]) < 0 ? 0 : parseInt(degree[degree.length-2]) - parseInt(degree[degree.length-1])}}</div>
                  </div>
                </div>
              </div>
            </div>
            
          </card>
        </div>
      </div>
      <div class="row">
         <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">Fan Option</h4>
              <p class="card-category">Temp & Fan Speed(percent %)</p>
            </template>
            <div class="container">
              <div class="row">
                <div class="col-6"><p>At Temperature</p></div>
                <div class="col-6"><p>Fan Speed %</p></div>
              </div>
              <div class="row">
              <b-form-input class="col-6" v-model="X1" placeholder="X1"></b-form-input>
              <b-form-input class="col-6" v-model="Y1" placeholder="Y1"></b-form-input>
              </div>
              <div class="row">
              <b-form-input class="col-6" v-model="X2" placeholder="X2"></b-form-input>
              <b-form-input class="col-6" v-model="Y2" placeholder="Y2"></b-form-input>
              </div>
              <div class="row">
              <b-form-input class="col-6" v-model="X3" placeholder="X3"></b-form-input>
              <b-form-input class="col-6" v-model="Y3" placeholder="Y3"></b-form-input>
              </div>
              <div class="row">
              <b-form-input class="col-6" v-model="X4" placeholder="X3"></b-form-input>
              <b-form-input class="col-6" v-model="Y4" placeholder="Y3"></b-form-input>
              </div>
              <b-button @click="SetFan()">Set</b-button>
            </div>
            
          </card>
        </div>
        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">Light <Option></Option></h4>
            </template>
            <div class="container">

              <div class="row">
                Light 1 : &nbsp;
                <div :style="styleObject1">Light 1</div>
                &nbsp; Light 2 : &nbsp;
                <div :style="styleObject2">Light 2</div>
                <!-- <div :style="dynamicStyle2">{{color2}}</div> -->
              </div>

              <div class="row" style="margin-top : 20px;">
                <b-button class="col-3" @click="lightMode = 1">M 1</b-button>
                <b-button class="col-3" @click="lightMode = 2">M 2</b-button>
                <b-button class="col-3" @click="lightMode = 3">M 3</b-button>
                <b-button class="col-3" @click="lightMode = 4">M 4</b-button>
              </div>
            </div>
            <div class="row center" style="margin-top:20px;"><p class="col center">Mode : {{ModeName[lightMode-1]}}</p></div>
            <!-- <compact-picker v-model="colors" /> -->
            <div class="container center" v-if="lightMode == 1" >

              <b-button style="margin-top:10px" @click="SetLight()">Set Light</b-button>
            </div>
            <div class="container center" v-if="lightMode == 2" >
              <p>Color 1</p>
              <Compact v-model="color1" />
              <p>Color 2</p>
              <Compact v-model="color2" />

              <b-button style="margin-top:10px" @click="SetLight()">Set Light</b-button>
            </div>
            <div class="container center" v-if="lightMode == 3" >
              <p>Color 1</p>
              <Compact v-model="color1" />


              <b-button style="margin-top:10px" @click="SetLight()">Set Light</b-button>
            </div>
            <div class="container center" v-if="lightMode == 4" >
              <p>Color 1</p>
              <Compact v-model="color1" />
              <p>Color 2</p>
              <Compact v-model="color2" />

              <b-button style="margin-top:10px" @click="SetLight()">Set Light</b-button>
            </div>

            
          </card>


        </div>
        <div class="col-md-4">
          <card>
            <template slot="header">
              <h4 class="card-title">Light Speed</h4>
            </template>
            <vue-slider ref="slider" v-model="value" min="1" max="10" style="margin-top:30px;"></vue-slider>
            <b-button style="margin-top:10px" @click="SetLightSpeed()">Set LightSpeed</b-button>
            
          </card>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  import ChartCard from 'src/components/UIComponents/Cards/ChartCard.vue'
  import StatsCard from 'src/components/UIComponents/Cards/StatsCard.vue'
  import Card from 'src/components/UIComponents/Cards/Card.vue'
  import LTable from 'src/components/UIComponents/Table.vue'
  import Checkbox from 'src/components/UIComponents/Inputs/Checkbox.vue'
  import TempChart from 'src/components/UIComponents/Temp.js'
  import * as firebase from 'firebase';
  import { VueLoading } from 'vue-loading-template'
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import { Photoshop,Compact } from 'vue-color'
  import vueSlider from 'vue-slider-component'

  var config = {
    apiKey: 'AIzaSyDPUe06iiJaib7HgN6_cAg7ncl2iDGgMhQ',
    authDomain: 'stm32t1.firebaseapp.com',
    databaseURL: 'https://stm32t1.firebaseio.com',
    projectId: 'stm32t1',
    storageBucket: 'stm32t1.appspot.com',
    messagingSenderId: '312686817903'
  }
  firebase.initializeApp(config)
  var database = firebase.database()
  console.log(database)
  var LightStatus = database.ref('/Light')
  var FanStatus = database.ref('/Fan')
  var TempRef = database.ref('/temp')
  var FanRef = database.ref('/embeded/Fan')
  var LightRef = database.ref('/embeded/Light')
  var Temper = database.ref('/temperature')
  var Embeded = database.ref('/embeded')
  var LightSpeed = database.ref('/embeded/LightSpeed')
  export default {
    components: {
      Checkbox,
      Card,
      LTable,
      ChartCard,
      StatsCard,
      TempChart,
      VueLoading,
      Compact,
      vueSlider

    },
    methods: {
      getString(x){
        var pad = "000"
        var str1 = "" + x
        var ans1 = pad.substring(0, pad.length - str1.length) + str1
        return ans1
      },
      SetFan() {
        // FanRef.set({X1:+(this.X1), X2:+(this.X2), Y1:+(this.Y1), Y2:+(this.Y2)});
        FanStatus.set({X1:this.X1,X2:this.X2,X3:this.X3,X4:this.X4,Y1:this.Y1,Y2:this.Y2,Y3:this.Y3,Y4:this.Y4})
        FanRef.set({X1:this.getString(this.X1), X2:this.getString(this.X2), Y1:this.getString(this.Y1), Y2:this.getString(this.Y2), X3:this.getString(this.X3), X4:this.getString(this.X4), Y3:this.getString(this.Y3), Y4:this.getString(this.Y4)})
      },
      SetLight() {
        let c1 = this.color1.rgba
        let c2 = this.color2.rgba
        let cc1 = this.SetColor(c1.r,c1.g,c1.b)
        let cc2 = this.SetColor(c2.r,c2.g,c2.b)
        console.log('set light');
        LightStatus.set({
          light1 : this.color1,
          light2 : this.color2,
        })
        let data = { 
          lightMode:"0"+(this.lightMode-1),
          color1: cc1,
          color2: cc2,
        }
        LightRef.set(data)
      },
      SetLightSpeed(){
        console.log('set light speed');
        let ls = "0"+this.value
        if(this.value == 10) ls = "10"
        LightSpeed.set(ls)
      },
      SetColor(R,G,B){
        const TR = Math.floor((R/256)*999)
        const TG = Math.floor((G/256)*999)
        const TB = Math.floor((B/256)*999)
        var pad = "000"
        var str1 = "" + TR
        var ans1 = pad.substring(0, pad.length - str1.length) + str1
        var str2 = "" + TG
        var ans2 = pad.substring(0, pad.length - str2.length) + str2
        var str3 = "" + TB
        var ans3 = pad.substring(0, pad.length - str3.length) + str3
        const color = {
          R:ans1,
          G:ans2,
          B:ans3,
        }
        return color
      },
    },
    // black RX
    mounted () {
      FanStatus.on('value', (snapshot) => {
        const res = snapshot.val()
        this.X1 = res.X1
        this.X2 = res.X2
        this.X3 = res.X3
        this.X4 = res.X4
        this.Y1 = res.Y1
        this.Y2 = res.Y2
        this.Y3 = res.Y3
        this.Y4 = res.Y4
      })
      LightStatus.on('value', (snapshot) => {
        const res = snapshot.val()
        console.log(res.light1);
        this.color1 = res.light1
        this.color2 = res.light2
        this.styleObject1 = {
          color : `rgb(${this.color1.rgba.r},${this.color1.rgba.g},${this.color1.rgba.b})`,
          width : '50px'
        }
        this.styleObject1['background-color'] = `rgb(${this.color1.rgba.r},${this.color1.rgba.g},${this.color1.rgba.b})`
        this.styleObject2 = {
          color : `rgb(${this.color2.rgba.r},${this.color2.rgba.g},${this.color2.rgba.b})`,
          'background-color' : `rgb(${this.color2.rgba.r},${this.color2.rgba.g},${this.color2.rgba.b})`,
          width : '50px'
        }
        // this.styleObject2['background-color'] = `rgb(${this.color2.r},${this.color2.g},${this.color2.b})`
      })
      Temper.on('value', (snapshot) => {
        const degree = snapshot.val()
        TempRef.push({degree,time:new Date().toISOString().split('T')[1].split('.')[0]})
      })
      TempRef.on('value', (snapshot) => {
        this.isLoading = true
        const array = Object.keys(snapshot.val())
        const temp = array.map(key => {
          const t = snapshot.val()[key]
          return {'degree': t.degree, 'time': t.time}
        })
        const earth = temp
        const la = earth.map(data => {
          return data.time
        })
        const da = earth.map(data => {
          return data.degree
        })
        const l = temp.length
        this.labal = la.slice(l - 10, l)
        this.degree = da.slice(l - 10, l)
        this.isLoading = false
      })
    },
    data () {
      return {
        styleObject1: {
          color: 'red'
        },
        ModeName: ['Rainbow','Temperature','Static Color','Two Color Fading'],
        value: 1,
        colors: { r: 255, g: 0, b: 0 },
        color1: {
          R: 0,
          G: 0,
          B: 0
        },
        color2: {
          R: 0,
          G: 0,
          B: 0
        },
        lightMode: 1,
        X1: null,
        X2: null,
        Y1: null,
        Y2: null,
        X3: null,
        Y3: null,
        X4: null,
        Y4: null,
        isLoading: false,
        labal: null,
        degree: null,
        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
      }
    }
  }
</script>
<style>
.center {
  text-align: center
}
.cc {
  font-size: 50px;
}
.ci {
  justify-items: center;
}
</style>
