// $(function(){

	var huicalender = function(element, options){
		this.element = element;
		this.enabledDay = options.enabledDay;
		this.viewDay = options.viewDay || new Date();
		this.year = this.viewDay.getFullYear();
		this.month = this.viewDay.getMonth();
		this.monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一', '十二'];
		this.getCalender();
		this.bindEvent();
	}
	huicalender.prototype = {
		getCalender: function(){
			var that = this;

			var isLeapYear = (((this.year % 4 === 0) && (this.year % 100 !== 0)) || (this.year % 400 === 0));   
			var daysInMonth = [31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][this.month]

			var dateFirst = new Date(this.year+'/'+(this.month+1)+'/'+1);
			var dateLast = new Date(this.year+'/'+(this.month+1)+'/'+daysInMonth);
			var dayFirst = dateFirst.getDay();
			var dayLast = dateLast.getDay();

			var calender = [];
			for (var i = dayFirst-1; i >= 0; i--) {
				calender.push('');
			};
			for (var i = 1; i <= daysInMonth; i++) {
				calender.push(i);
			};
			for (var i = dayLast+1; i < 7; i++) {
				calender.push('');
			};

			var tbody = '';
			for (var i = 0; i < calender.length; i++) {
				if(i%7 == 0){
					tbody += '<tr> <td class="'+( ($.inArray(calender[i], this.enabledDay) == -1)? '':'enabled' )+'">'+calender[i]+'</td>';
				} else if(i%7 == 6){
					tbody += '<td class="'+( ($.inArray(calender[i], this.enabledDay) == -1)? '':'enabled' )+'">'+calender[i]+'</td> </tr>';
				} else {
					tbody += '<td class="'+( ($.inArray(calender[i], this.enabledDay) == -1)? '':'enabled' )+'">'+calender[i]+'</td>';
				}
			};

			var monthTab = '<ul>';
			for (var i = 0; i < this.monthArr.length; i++) {
				monthTab += '<li value="'+i+'" class="'+(i==1? 'border-top1':'')+'">'+this.monthArr[i]+'</li>';
			};
			monthTab += '</ul>';

			var thead = 
			'<thead>'+
				'<tr>'+
					'<th><span class="left"></span></th>'+
					'<th colspan="2" class="month" month="'+(this.month+1)+'">'+this.monthArr[this.month]+monthTab+'</th>'+
					'<th colspan="3" class="year" year="'+this.year+'">'+this.year+'年</th>'+
					'<th><span class="right"></span></th>'+
				'</tr>'+
				'<tr class="week">'+
					'<th>日</th>'+
					'<th>一</th>'+
					'<th>二</th>'+
					'<th>三</th>'+
					'<th>四</th>'+
					'<th>五</th>'+
					'<th>六</th>'+
				'</tr>'+
			'</thead>';
			var table = '<table class="huicalender huicalender1 huicalender2" cellspacing="0">'+thead+'<tbody>'+tbody+'</tbody></table>';
			this.element.html(table);
		},
		bindEvent: function(){
			var that = this;
			this.element.on('click', '.left', function(){
				that.month--;
				if(that.month == -1){
					that.month = 11;
					that.year--;
					if(that.year == 1900){
						that.year++;
						that.month++;
					}
				}
				that.getCalender();
				that.element.trigger({
					type: 'changeMonth',
					month: parseInt(that.month)+1,
					year: parseInt(that.year)
				})
			})
			this.element.on('click', '.right', function(){
				that.month++;
				if(that.month == 12){
					that.month = 0;
					that.year++;
				}
				that.getCalender();
				that.element.trigger({
					type: 'changeMonth',
					month: parseInt(that.month)+1,
					year: parseInt(that.year)
				})
			})
			this.element.on('click', '.month', function(){
				$(this).find('ul').toggle();
				// $(this).toggleClass('show');
			})
			this.element.on('click', '.month li', function(){
				var value = $(this).attr('value');
				that.month = value;
				that.getCalender();
				that.element.trigger({
					type: 'changeMonth',
					month: parseInt(that.month)+1,
					year: parseInt(that.year)
				})
			})
			this.element.on('click', '.enabled', function(){
				that.element.trigger({
					type: 'changeDate',
					date: $(this).html(),
					month: parseInt(that.month)+1,
					year: parseInt(that.year)
				})
			})
		}

	}
	$.fn.huicalender = function(options, operate){
		if(operate == 'update'){
			var hui = $(this).data('huicalender');
			hui.enabledDay = options.enabledDay;
			hui.viewDay = options.viewDay || new Date();
			hui.year = hui.viewDay.getFullYear();
			hui.month = hui.viewDay.getMonth();
			hui.getCalender();
		} else {
			var hui = new huicalender(this, options);
			$(this).data('huicalender', hui);
		}
		
		return this;
	}




























// })