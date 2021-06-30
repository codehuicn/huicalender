# huicalendar

A small calendar using jQuery. It can show the month you gave, show the active dates you setted, get the month users selected, get the date users selected.

### You can use it like this:
```
    		$('.test').huicalendar({
			enabledDay: [1,2,3],
			viewDay: new Date('2016/08/01')
		}).on('changeMonth', function(e){
			console.log(e.year)
			console.log(e.month)
			$(this).huicalendar({
				enabledDay: [4,5,6],
				viewDay: new Date(e.year+'/'+e.month+'/01')
			}, 'update')
		}).on('changeDate', function(e){
			console.log(e.year)
			console.log(e.month)
			console.log(e.date)
		})
```
