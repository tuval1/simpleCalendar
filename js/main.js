
function meetings() {

    this.data = [
        {title:'Meeting 1',startDate: dateToTimestamp(2017,7,25),endDate:'2017-7-26',participant: ['Tova','Orit']},
        {title:'Meeting 2',startDate: dateToTimestamp(2017,6,22),endDate:'2017-6-23',participant: ['shula','Tova']},        
        {title:'Meeting 3',startDate: dateToTimestamp(2017,8,15),endDate:'2017-8-16',participant: ['Tova','Mola']}
    ];
    this.i_meeting = 0;

} 
meetings.prototype.addMeeting = function(title,y,d,m,endDate){
    console.log('add meet');
    this.data.push({title:title,startDate: dateToTimestamp(y,m,d),endDate:endDate,participant: []});

}

meetings.prototype.sort = function(){
    this.data = this.data.sort(function(a,b){
        return a.startDate - b.startDate;
    });
    
}

function dateToTimestamp(year,mon,day){
    var date1 = new Date(year,mon,day);
    var dateTimeStamp = date1.getTime();
    return dateTimeStamp;
}

meetings.prototype.findNextMeeting = function(){
    
    var nextMeet = this.data[this.i_meeting + 1];
    return nextMeet;
}

meetings.prototype.getMeetingsCountFor = function(participantName){
    var count=0;
   this.data.forEach(function( el ) {
       el.participant.forEach(function( pr ) {
           if( pr===participantName ) count++;
       });
   });
   
   return count;
}

function calendar(){
    this.strHtml = this.createHtml();

    this.browse = function(level){
        this.month = this.month + level;
        cal.strHtml = cal.createHtml();
        
        
    }
    
}


calendar.prototype.createHtml = function(){
    var now = new Date();
    this.month = now.getMonth();

    var numDays = countDaysInMonth(now.getFullYear()+1,this.month);
    var strHtml = '';
    for(var i=1; i <= numDays; i++){
        strHtml += '<li>';
        strHtml += i;
        strHtml += '</li>';
    } 
    
    return strHtml;
}

calendar.prototype.render = function(){
    document.querySelector('.days').innerHTML = this.strHtml;
    document.querySelector('.month-label').innerText = this.month;
}

// calendar.prototype.browse = function(level){
//     this.month = this.month+level;    
    
    
// }

function countDaysInMonth(y,d) {
  return new Date(y, d, 0).getDate();
}


var meeting = new meetings;

