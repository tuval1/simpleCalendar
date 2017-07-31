var gMeetings = [
    {title:'Meeting 1',startDateT: 0,startDate: "2017-07-23", endDate:'2017-5-26',checked: false,participant: ['Tova','Orit']},
    {title:'Meeting 2',startDateT: 0,startDate: "2017-07-24", endDate:'2017-5-23',checked: false,participant: ['shula','Tova']},        
    {title:'Meeting 3',startDateT: 0,startDate: "2017-07-25", endDate:'2017-5-27',checked: false,participant: ['Tova','Mola']}
];
var now    = new Date();
var gMonth = now.getMonth()+1;
var gYear  = now.getFullYear();

function init(){
    //sort meetings
    sortM();
    createCal();
	convertgMonthTostr();
    
}


// function addMeeting(title,y,d,m,endDate){
//     gMeeting.push( { title:title,startDate: dateToTimestamp(y,m,d),endDate:endDate,participant: [] } );
// }


function sortM(){
    gMeetings.sort(function(a,b){
        return a.startDateT - b.startDateT;
    });
}


function convertToTimestamp(strDate){ 
    
    var myDate  = strDate;
    //put the date in array
    myDate      = myDate.split("-");

    var newDate = myDate[1]+"/"+myDate[2]+"/"+myDate[0];
    var timest  = new Date(newDate).getTime();

    return timest;
}

function getMeetingsCountFor(participantName){
    var count=0;
    gMeetings.forEach(function( el ) {
       el.participant.forEach(function( pr ) {
           if( pr===participantName ) count++;
       });
   });
   
   return count;
}

function createCal( isFormBrowse ){
    convertgMonthTostr();
    var numOfDays = countDaysInMonth();
    var strHtml = '';
    strHtml += '<ul>'
    for(var i=1; i <= numOfDays; i++){
        var t = ( i <= 9 ? 0 + i.toString() : i);
        strHtml += '<li onclick="setStartDate(' + i + ')" class="datepicker-td cell-' + gYear + '-'  + gMonth + '-' + t + '">';
        strHtml += i;        
        strHtml += '</li>';
        
    } 
    strHtml += '</ul>'
    
    renderTable(strHtml);
    displayMeetOnCal( isFormBrowse );
}


function countDaysInMonth(y,d) {
  return new Date(gYear, gMonth, 0).getDate();
}

function renderTable(strHtml){
    document.querySelector('.calendar-body').innerHTML = strHtml;
    document.querySelector('.month-label').innerText = gMonth + "-" + gYear;
}

function browseCal(level){
    var isFormBrowse = true;
    gMonth = +gMonth + level;
    if( gMonth > 12 ){
        gMonth = 1;
        gYear  = gYear+1;
    } else if( gMonth < 1 ){
        gMonth = 12;
        gYear  = gYear - 1;
    }

    createCal(isFormBrowse);
}

function addMeeting(){
    var title     = document.querySelector('#title');
    var startDate = document.querySelector('#startDate');
    var startDateT= convertToTimestamp( startDate.value );
    var endDate   = document.querySelector('#endDate');
    var participants = document.querySelector('#participants');

    gMeetings.push(  
        {
          title:     title.value,
          startDateT: startDateT,
          startDate: startDate.value, 
          endDate:   endDate.value,
          checked:   false,
          participant: participants.value.split(',')
        },
        );
    displayMeetOnCal();
    clearInput( title, startDate, endDate, participants );
    document.querySelector('.modal').classList.add('hidden');
}

function clearInput(){
    for( var i=0; i < arguments.length; i++ ) {
        arguments[i].value = '';
    }
}

function displayMeetOnCal(isFormBrowse){    
    gMeetings.forEach(function( el ) {
        
     if ( el.startDate.substring(5,7) == gMonth && !el.checked || el.startDate.substring(5,7) == gMonth && isFormBrowse) {
        document.querySelector('.cell-' + el.startDate + '').classList.add('highlight');
        el.checked = true;
        
     }
     
        
    });
    
}

function setStartDate( day ){
    day = cnvrtDateEl ( day );

    var startDate = gYear +'-' + gMonth + '-' + day;    
    document.querySelector('#startDate').value = startDate;
    document.querySelector('#endDate').value = startDate;

    showModal();
    showMeetings(day);
}

function convertgMonthTostr( el ){
    if ( +gMonth <= 9  && gMonth.toString().length < 2) {
        gMonth = 0 + gMonth.toString();
    }
}

function cnvrtDateEl( el ){
    if ( el <= 9 && el.toString().length < 2 ){
        el = 0 + el.toString();
    }
    return el;
}

function showModal(){
    document.querySelector('.modal').classList.remove('hidden');
}

function showMeetings( day ){
    day = cnvrtDateEl ( day );
    
    var meetingsHtml = document.querySelector('.show-meetings');
    meetingsHtml.innerHTML = '';
    var date    = gYear + '-' + gMonth + '-' + day;

    gMeetings.forEach(function( meeting ) {
        
        if (meeting.startDate === date) {
            var strHtml = '';
            strHtml += '<div class="wrapper">'
            strHtml += '<div class="caption"><span>Title: </span>' + meeting.title + '</div>';
            strHtml += '<div class="caption"><span>Start Date: </span>' + meeting.startDate + '</div>'
            strHtml += '<div class="caption"><span>End Date: </span> '+ meeting.endDate + '</div>'
			if(meeting.participant.length > 0) {
				strHtml += '<h2>Participants:</h2>';
			}
            for(var i=0;i<meeting.participant.length;i++){
				strHtml += '<span class="badge">' + meeting.participant[i] + '</span>';
			}
            strHtml += '</div>'
            
            meetingsHtml.innerHTML += strHtml;            
        }
        
    });
    
}