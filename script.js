/*************Script file for Alarm clock program*********** */
/*************Logic for selecting alarm in the clock******* */
// using IIFE for alarm selection as soon as the program execute we will get option in select option form to select alarm
(function() {
	var hourSelection = document.getElementById('hourSelction')
	var minSelection = document.getElementById('minSelction')
	var secSelection = document.getElementById('secSelction')
	var ampmSelection = document.getElementById('ampmSelId')
	for(let i=0;i<=60;i++){

		if(i<=12 && i!=0){
			let newOPtion=''
			newOPtion = document.createElement('OPTION');
			if(i<10){
			newOPtion.innerText = '0'+i
			newOPtion.setAttribute('value','0'+i)
			}else{
				newOPtion.innerText = i;
				newOPtion.setAttribute('value',i)

			}
			hourSelection.append(newOPtion)
		}
		if(i<=60){
			let newOPtionmin=''
			let newOPtionsec = ''
			newOPtionmin = document.createElement('OPTION')
			
			newOPtionmin.innerText = i<10?'0'+i:i
			newOPtionmin.setAttribute('value',newOPtionmin.innerText)
			minSelection.append(newOPtionmin)
			newOPtionsec = document.createElement('OPTION')
			newOPtionsec.innerText = i<10?'0'+i:i
			newOPtionsec.setAttribute('value',newOPtionsec.innerText)
			secSelection.append(newOPtionsec)

		}
		if(i == 1){
			let newAm =''
			let newpm =''
			newAm = document.createElement('OPTION')
			newAm.innerText = 'AM'
			newAm.setAttribute('value','AM')
			newpm = document.createElement('OPTION')
			newpm.innerText = 'PM'
			newpm.setAttribute('value','PM')
			ampmSelection.append(newAm)
			ampmSelection.append(newpm)
		}
	}
})()


/*************Logic for getting the current date an in the clock******* */

// for getting current data and time
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var hoursdisp = document.getElementById('hours')
var mindisp =	document.getElementById('min')
var secdisp  = document.getElementById('sec')
let ampmdisp  = document.getElementById('ampm')
var ampm = ''
let AlarmSelection= document.getElementById('setlarm')
var set1= []
var listofAlarms = {}
let currentTime = ''
var music1 = new Audio("sherlock.mp3")
music1.loop = true;

/************* function for setting current date an in the clock******* */

function timesetting(){
var today = new Date();
var hours = today.getHours()
var min = today.getMinutes()
var sec = today.getSeconds()
ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
hours = hours<10? '0'+hours:hours
min = min<10 ? '0'+min:min;
sec = sec<10? '0'+sec:sec;
currentTime = hours+min+sec+ampm // adding for checking the value @ alarm check @ line no 190 for hitting alert
hoursdisp.innerText = hours;
mindisp.innerText = min;
secdisp.innerText = sec;
ampmdisp.innerText = ampm;
}
/************* function for setting current date an in the clock******* */

setInterval(timesetting,1000) // for continous working clock @ every second
let alarmsarr = []
/*************Logic for getting the current date an in the clock******* */


/************* function for displaying new alarms Values ******* */
function addAlarmAnddeletebuttom(hourSelected,minSelection,secSelection,ampmval,index,arr){
	let newAlarmsSec = document.getElementById('newAlarmsSec')
	let newAlarms = document.createElement('div') 
	newAlarms.classList.add('newAlarmsAndDeleteButton')
	newAlarms.setAttribute('index',index)
	newAlarms.setAttribute('id','id'+index)
	newAlarmsSec.append(newAlarms)
	let newParaTah = document.createElement('P')
	newParaTah.classList.add('newParaTahclass')
	newParaTah.innerText = hourSelected+':'+minSelection+':'+secSelection+''+ampmval
	newAlarms.append(newParaTah)
	let newDeleteButton = document.createElement('Button')
	newDeleteButton.innerText = 'DELETE'
	newDeleteButton.classList.add('buttonheight')
	newDeleteButton.setAttribute('Id','deletealarm'+index)
	newDeleteButton.setAttribute('index',index)
	newAlarms.append(newDeleteButton)
	for(let i=0;i<arr.length;i++){
 		alarmsarr[i]=arr[i].hourSelected+arr[i].minSelection+arr[i].secSelection+arr[i].AlarmSelection
 	}
	newDeleteButton.addEventListener('click',function(){
	let attrbu=newDeleteButton.getAttribute('index')
	let alarmsection = document.getElementById('id'+attrbu)
	alarmsection.remove()
		arr[attrbu-1]
		for(let i=0;i<arr.length;i++){
			if(arr[i].id == attrbu){
				 arr.splice(i,1)
				 alarmsarr.splice(i,1)
				break;
			}
		}

	})
}
/*************END  function for displaying new alarms Values ******* */


var arr=[]
var inc = 1;
var uniquealarms = []
var mainunique = []
var index=0;

/************* function for creating new alarm ******* */

AlarmSelection.addEventListener('click', function(){
	let hourSelected = document.getElementById('hourSelction').selectedIndex;
	let minSelection = document.getElementById('minSelction').selectedIndex;
	let secSelection = document.getElementById('secSelction').selectedIndex;
	let ampmSelection = document.getElementById('ampmSelId').selectedIndex;
	
	hourSelected++;
	minSelection;
	secSelection;
	hourSelected = hourSelected<10 ? '0'+hourSelected : hourSelected;
	minSelection = minSelection<10 ? '0'+minSelection:minSelection;
	secSelection = secSelection<10? '0'+secSelection:secSelection;
	let ampmval=''
	if(ampmSelection==0){
		ampmval='AM';
	}else if(ampmSelection==1){
		ampmval='PM';
	}
	let alarmTimes = hourSelected+minSelection+secSelection+ampmval	;
	uniquealarms.push(alarmTimes)
		listofAlarms = {
		id : inc++,
		hourSelected:hourSelected,
		minSelection:minSelection,
		secSelection:secSelection,
		AlarmSelection:ampmval

	}
	arr.push(listofAlarms)
	var resArr = [];
	arr.filter(function(item){
  var i = resArr.findIndex(x => (x.hourSelected == item.hourSelected && x.minSelection == item.minSelection && x.secSelection == item.secSelection));
  if(i <= -1){
        resArr.push(item);
  }
  return null;
});
index++;
	addAlarmAnddeletebuttom(hourSelected,minSelection,secSelection,ampmval,index,arr)

})
/*************END function for creating new alarm ******* */


/************* function for hitting alert ******* */
	
function hittingAlert()
{
	for(let i=0;i<arr.length;i++){
		if(currentTime==alarmsarr[i]){
			alert('hey Wake up from you Mind Palace');
			music1.play();
		}
	}
}

setInterval(hittingAlert,1000) // for continous checking 
/*************END function for hitting alert ******* */
/*************function for stoping the musiv ******* */

document.querySelector('.stopTheAlarm').addEventListener('click',function(){
	console.log('click')
	music1.pause();
	music1.currentTime = 0;
})
