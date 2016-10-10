/**
 * Created by chizhang on 16/9/19.
 */
$(function () {
  $.ajax({
    type: 'GET',
    url: '../city.json',
    dataType: 'json',
    // success: function (data) {
    //   parse(data)
    // },
    success: function (data) {
      var lineHeight;
      var jsonObject = data;
      var provinceName;
      [].forEach.call(jsonObject, function (element, index) {
        $('#province').append('<li>' + Object.keys(element) + '</li>')

      })
      lineHeight = $('li').height()
      console.log(lineHeight)
      $('#province').on('click', 'li', function () {
        $('#province').toggle();
        [].filter.call(jsonObject, function (element) {
          if (this.innerText == Object.keys(element)) {
            return Object.valueOf(element)
          }
        }, this)
          .forEach(function (element) {
            var key = Object.keys(element)[0]
            var arr = eval('element.' + key)
            $('#city').empty();
            provinceName = Object.keys(element)
            $('#city').empty().append('<li id="city_title" class="checkedCity">' + provinceName + '</li>');
            $('#city_title').on('click', function () {
              $('#province').show()
              $('#city').hide()
              $('#city').off('click', 'li')
              $('#county').hide()
              $('#county').off('click', 'li')
            });
            [].forEach.call(arr, function (element, index) {
              $('#city').append('<li>' + Object.keys(element) + '</li>')
            });
            $('#city').toggle()
            $('#county').hide()
            $('#city').on('click', 'li', function () {
              if (this.id == 'city_title') {
                return
              }
              $('#city').toggle();
              console.log(1)
              $('#county').toggle();
              [].filter.call(arr, function (element) {
                if (this.innerText == Object.keys(element)) {
                  return Object.valueOf(element)
                }
              }, this)
                .forEach(function (element) {
                  var key = Object.keys(element)[0]
                  var arr = eval('element.' + key)
                  $('#county').empty().append('<li class="county_title_1 checkedCity">' + provinceName + '</li>')
                    .append('<li class="county_title_2 checkedCity">' + Object.keys(element) + '</li>');
                  $('.county_title_1').on('click', function () {
                    $('#province').show()
                    $('#city').hide()
                    $('#city').off('click', 'li')
                    $('#county').hide()
                    $('#county').off('click', 'li')
                  })
                  $('.county_title_2').on('click', function () {
                    $('#province').hide()
                    $('#city').show()
                    $('#county').hide()
                    $('#county').off('click', 'li')
                  });
                  [].forEach.call(arr, function (element, index) {
                    $('#county').append('<li>' + element + '</li>')
                  })

                })
            })
          })


      })

    },
    error: function (xhr, type) {

    }
  })
  // function parse(data) {
  //   var json = data;
  //   console.log(json)
  //   function query(d) {
  //     [].filter(d, function (element) {
  //
  //     })
  //   }
  //
  //   function update(json) {
  //     if (Array.isArray(data)) {
  //
  //     }
  //     [].forEach.call(json, function (element) {
  //       var s;
  //       if (Array.isArray(element)) {
  //         s = element
  //       }
  //       $('#cities').append('<li id="' + index + '">' + Object.keys(element) + '</li>')
  //     })
  //   }
  //
  //
  // }
})
