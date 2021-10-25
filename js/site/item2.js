(function() {


    $(document).ready(function(e) {
      $html.addClass('jquery');
      
      const queryString = window.location.search;
  
  
  
      const pId = queryString.slice(queryString.indexOf('=') +1);
      // console.log("prodID number: ", pId)  // query string from url
   
          
     $.getJSON('../data.json', function (data) {
          
  
            
      if(!pId ){
              //=======  initialize=======================================================
                // console.log("all Data", data)
                var output = '';
               
              $.each(data, function (key, val) {
                  let formStr="";
                 let discountPrice =0;
                  output += '<div class="flexbox-item">';
                //   output += '<a href= product-detail.html?pId=' + val.prodId + ' >';
                output += '<a href=item2.html?pId=' + val.prodId + ' >';
                  output += '<div class="posts-img" ';
                  // output += 'style="background:url(' + val.mediumImageURL + '); background-size:cover; background-position:center;" >';
                  output += 'style="background:url(' + val.imageURL + ');background-size:cover; background-position:center;" >';
                  output += '</div></a>';
                  
                  formStr += '<form method="get" class="basket_add_prod" id="basket_add_prod_'+key+'" >';
                  formStr += '<input type="hidden"  name="miniBasket" id="miniBasket" value="true"/>';
                  formStr += '<input type="hidden" name="total" id="total" value="'+val.price +'" />';
                  formStr += '<input type="hidden" name="shipping"  id="shipping" value="11"/>';
              
                  formStr += '<input type="hidden" name="category" id="category" value="'+val.listID + '"/>';
                  formStr += '<input type="hidden" name="itemname" id="itemname" value="'+val.brand +'"/>';
                  formStr += '<input type="hidden"  name="qty" id="qty" value="1" />';
              
  
                  if (val.isAvailable){
           
                      if(val.onSale){
                          discountPrice = ( ( (100 - parseInt( val.discount)) /100) * val.price).toFixed(2)
                          // console.log (discountPrice);
                          formStr += '<input type="hidden" name="unitprice" id="unitprice" value="'+ discountPrice +'" />';
                          output += formStr + '<input type="submit" id="add-to-basket" class="checkout onSale float_right" value="Add to Basket" /></form>';
                          output += '<div class="onsale-price" style="height:40px"><span id="test-on-sale">$' + val.price +'</span> <br/><span style="color:red;"> You pay:<b> $'+discountPrice+'</b></span> </div>' ;
                      }else{
                        formStr += '<input type="hidden" name="unitprice" id="unitprice" value="'+val.price+'" />';
                           output += formStr + '<input type="submit" id="add-to-basket"  class="checkout float_right" value="Add to Basket" /></form>';
                           output += '<div class="regular-price" style="height:40px"> <span id="regular-sale">$' +val.price+'</span></div>' ;
                 
                          }
                  }       
                  else{ 
                      output += '<div class="out-of-stock">Out of stock</div> <b>$' + val.price +'</b>' ;
                  }
                //==========================================================================
        
                  output += '<div class="posts-detail">Brand: '+val.brand +'<p>' + val.caption.substring(0,34) + '<b>....</b> </p></div>';
  
                //===========================================================================
                  output += '<div class="list-price-normal" > ';
                  if(val.onSale){
                      output +=  '<img src = "../../images/site/cashback-icon.svg" width="15px" height="15px"/><span style="color:Red; padding-left:5px;"><b>' + val.discount + '% off </b></span></div>';           
                  }
  
                  output += '<div class="list-price-mobile" ><b>$' + val.price +'</b> &nbsp; &nbsp; ';
                  if(val.onSale){
                  
                
                      output +=  '<img src = "../../images/site/cashback-icon.svg" width="15px" height="15px"/><span style="color:Red; padding-left:5px;"><b>' + val.discount + '% off </b></span></div>';           
                  }
                  else{
                      output += '</div> ';
                  }
          //===================================================================================
                
                  output += '</div></div></div>';
              });
          
              $('section.main .flex-container').html(output);
  
//sorted area============================================================================
              $('select').on('change', function() {
                  console.log( this.value );
                  var x = this.value;
  
              if( x === "price"){
                  prod =  data.sort((a,b)=> a.price -b.price)
  
              }else if( x === 'onSale'){
              prod = data.filter(p=> p.onSale)
              }else if( x === "brand"){
                prod = data.sort((a,b)=> (a.brand > b.brand) ? 1: -1 )
              }else if( x=== "isAvailable"){
                    prod = data.filter(p=> p.isAvailable)
              }else if( x === 'caption'){
                    prod = data.sort((a,b)=> (a.caption > b.caption) ? 1: -1 ) 
              }
  
          
             var output = '';
          
  
          $.each(prod, function (key, val) {
            let formStr="";
            let discountPrice =0;
            output += '<div class="flexbox-item">';
            output += '<a href=item2.html?pId=' + val.prodId + ' >';
            output += '<div class="posts-img" ';
            output += 'style="background:url(' + val.mediumImageURL + '); background-size:cover; background-position:center;" >';
            output += '</div></a>';
            
            formStr += '<form method="get" class="basket_add_prod_sort" id="basket_add_prod_'+key+'" >';
            formStr += '<input type="hidden"  name="miniBasket" id="miniBasket" value="true"/>';
            formStr += '<input type="hidden" name="total" id="total" value="'+val.price +'" />';
            formStr += '<input type="hidden" name="shipping"  id="shipping" value="11"/>';
        
            formStr += '<input type="hidden" name="category" id="category" value="'+val.listID + '"/>';
            formStr += '<input type="hidden" name="itemname" id="itemname" value="'+val.brand +'"/>';
            formStr += '<input type="hidden"  name="qty" id="qty" value="1" />';
        
  
            if (val.isAvailable){
     
                if(val.onSale){
                    discountPrice = ( ( (100 - parseInt( val.discount)) /100) * val.price).toFixed(2)
                    // console.log (discountPrice);
                    formStr += '<input type="hidden" name="unitprice" id="unitprice" value="'+ discountPrice +'" />';
                    output += formStr + '<input type="submit" id="add-to-basket" class="checkout onSale float_right" value="Add to Basket" /></form>';
                    output += '<div class="onsale-price" style="height:40px"><span id="test-on-sale">$' + val.price +'</span> <br/><span style="color:red;"> You pay:<b> $'+discountPrice+'</b></span> </div>' ;
                }else{
                  formStr += '<input type="hidden" name="unitprice" id="unitprice" value="'+val.price+'" />';
                     output += formStr + '<input type="submit" id="add-to-basket"  class="checkout float_right" value="Add to Basket" /></form>';
                     output += '<div class="regular-price" style="height:40px"> <span id="regular-sale">$' +val.price+'</span></div>' ;
           
                    }
            }       
            else{ 
                output += '<div class="out-of-stock">Out of stock</div> <b>$' + val.price +'</b>' ;
            }
          //==========================================================================
  
            output += '<div class="posts-detail">Brand: '+val.brand +'<p>' + val.caption.substring(0,34) + '<b>....</b> </p></div>';
  
          //===========================================================================
            output += '<div class="list-price-normal" > ';
            if(val.onSale){
                output +=  '<img src = "../../images/site/cashback-icon.svg" width="15px" height="15px"/><span style="color:Red; padding-left:5px;"><b>' + val.discount + '% off </b></span></div>';           
            }
  
            output += '<div class="list-price-mobile" ><b>$' + val.price +'</b> &nbsp; &nbsp; ';
            if(val.onSale){
            
          
                output +=  '<img src = "../../images/site/cashback-icon.svg" width="15px" height="15px"/><span style="color:Red; padding-left:5px;"><b>' + val.discount + '% off </b></span></div>';           
            }
            else{
                output += '</div> ';
            }
    //===================================================================================
          
            output += '</div></div></div>';
           });
         
  
             $('section.main .flex-container').html(output);  
  
             $('.basket_add_prod_sort').on('submit', function(e) {
              alert("Hello")
              e.preventDefault();
             
              basket.productAdd($(this), $(this).serializeArray());
              basket.myFunction()
              return false;
            });
  
         });
              
        
      }else if(pId) {
                // ======use for product-detail page============================================================
                //======================================================== =========================
                  var output = '';
                  let discountStr ="";
                  let onSaleStr ="notOnSale";
              
                  for(let elm in data){   
                      if( data[elm].prodId == pId ){
                        let proObj = data[elm];
                        console.log("Prodout detai: ",proObj)
                      
                        //item left =============== product image
                        var img = document.createElement('img');
                        img.setAttribute("src", proObj.imageURL);
                        img.setAttribute("alt", proObj.caption);
                        img.setAttribute("height", "280px")
                        document.getElementById("img-container").appendChild(img);
                        // item right================== product detail
                        let afterDiscount=proObj.price;
                        if(proObj.onSale) {
                          onSaleStr = "onSale"; 
                          afterDiscount= ( ( (100 - parseInt( proObj.discount)) /100) * proObj.price).toFixed(2)
                          var elemBtn =document.getElementById("addtoBasket");
                          elemBtn.classList.add("isOnSale");   //elemBtn.className += "isStock"
                          var prodBox =document.getElementById("prod-box");
                          prodBox.classList.add("isOnSale"); 
                          discountStr += '<img src = "../../images/site/cashback-icon.svg" width="20px" height="20px" />';
                          discountStr += '<span style="color:Red; padding-left:5px;"><b>' + proObj.discount + '% off</b></span>';        
                          
                        }
                          
                          
                          document.getElementById('miniBasket').value = 'true';
                          document.getElementById('total').value = afterDiscount;
                          document.getElementById('shipping').value = '11';	
                          document.getElementById('unitprice').value =afterDiscount;	
                          document.getElementById('category').value = proObj.listID;
                          document.getElementById('itemname').value = proObj.brand;
                        
                          output += '<div class="posts-detail '+ onSaleStr + '"><p><b>Item #:</b> ' + proObj.prodId;
                          output += '</p><b>Brand: </b>'+ proObj.brand;
                          output += '<p>' + proObj.caption + '<br/><br/>'+ proObj.description +'</p>';
                          
                        if (proObj.isAvailable) {
                          output += '<div class="price-box">'
                          output += '<div class="list-price-item item"><span id="price-label" > List price: </span><span id="price-label">$'+ proObj.price +'</span> </div>';
         
                          output += '<div class="sale-price-item item '+onSaleStr+'"> <span id="sale-price"> '+discountStr + '</span> &nbsp; <span id="sale-price-percent">$' + afterDiscount + '</span></div>';
                        
                        //   output += '<div class="sale-price-item item '+onSaleStr+'"><span id="sale-price-percent">$' + afterDiscount + '</span></div>';
                          output += '</div>'
                        }else {   
                          output += '<span id="notAvailable"> Out of Stock</span></div>';
                          let qtyBox =document.getElementById("qty-box");
                          qtyBox.classList.add("notAvailable");
                        }
                    
  
                    }
            
                  }   
                  $('.prod-flex-container .sidebar .prod-detail-box').html(output);
      }  
              
        //=================================================
            $('.basket_add_prod').on('submit', function(e) {
              e.preventDefault();
             // console.log("who" , e.target)  
              basket.productAdd($(this), $(this).serializeArray());
              basket.myFunction()
              return false;
  
     
            });
           
      
   
            //======================================================
            //=======================================================
                $('nav a.mobile_menu').on('click', function () {
  
                  var currentNavHeight = $('nav').height();
                   console.log (currentNavHeight)
                  if (currentNavHeight < 5) {
                      var newNavHeight = $('nav >ul').height() + 40;
                      $('nav').animate({ 'height': newNavHeight + 'px' }, 750)
                  }
                  else {
                      $('nav').animate({ 'height': '0px' }, 750, function () {
                          $(this).removeAttr('style');
                      })
                  }//else
  
  
                });
  
                $(window).resize(function () {
                  if ($(this).width() > 625) {
                      $('nav').removeAttr('style');
                  }
                })
                
        })
  
     
      
     basket.init();
     
    //product.gallery();
   
    });
  
  
   
    var html = document.documentElement,
      $html = $(html),
      multiplier,
      current = 'current',
      close = 'close',
      open = 'open',
      hidden = 'hidden',
      selected = 'selected',
      jsNone = 'js_none',
      ariaHidden = 'aria-hidden',
      ariaInvalid = 'aria-invalid',
      ariaDescribedBy = 'aria-describedby';
  
    var $miniQty = $('#mini_qty'),
      $miniTotal = $('#mini_total'),
      $basketDrawer = $('#basket_drawer'),
      $drawerClose = $('#drawer_close'),
      $drawerSubTotal = $('#drawer_sub_total'),
      $drawerShippingTotal = $('#drawer_shipping_total'),
      $drawerGrandTotal = $('#drawer_grand_total'),
      $basketSubTotal = $('#basket_sub_total'),
      $basketShippingTotal = $('#basket_shipping_total'),
      $basketGrandTotal = $('#basket_grand_total'),
      $miniBasket = $('a.basket');
  
    var basket = {
      init: function() {
  
        $('.basket_add_prod_sort').on('submit', function(e) {
          alert("Hello")
          e.preventDefault();
          // console.log("who" , e.target)  
          basket.productAdd($(this), $(this).serializeArray());
          basket.myFunction()
          return false;
        });
  
        $('.basket_add').on('submit', function(e) {
          e.preventDefault();
          console.log("who" , e.target)  
          basket.productAdd($(this), $(this).serializeArray());
          basket.myFunction()
          return false;
        });
       
        if (!$.cookie('basket') && !izilla_gup.miniBasket)
          $('#basket_empty').removeClass(hidden);
        else
          basket.calculate();
        
        // if (izilla_gup.clearBasket) {
        //   $.removeCookie('basket');
        //   $.removeCookie('qty');
        //   $.removeCookie('shipping');
        //   $.removeCookie('total');
        //   var wl = window.location.toString();
        //   wl = wl.replace('clearBasket=true', '');
        //   window.location = wl;
        // }
    
        //========================================================
        // $drawerClose.on('click', function(e) {
        //   e.preventDefault();
        //   $basketDrawer.slideUp();
        // });
        
        // $miniBasket.hoverIntent({
        //   timeout: 500,
        //   over: function() {
        //     if (!$miniBasket.hasClass('empty')) {
        //       if ($.cookie('qty')) {
        //         if (parseInt($.cookie('qty')) === 1)
        //           $('.drawer_item').eq(0).removeClass(hidden);
        //         else
        //           $('.drawer_item').removeClass(hidden);
                
        //         $basketDrawer.slideDown();
        //       }
        //     }
        //   },
        //   out: function() {
        //     return;
        //   }
        // });
      },
      myFunction: function(){
       
        alert(""+ $.cookie('qty') +" item in your shooping cart")
        document.getElementById("mini_qty").innerHTML = $.cookie('qty')
       
      },
      calculate: function(post) {
        var $basketContents = $('#basket_contents'),
          $basketItems = $('.basket_item'),
          query = window.location.search,
          shipping,
          total,
          grandtotal;
        
         // console.log("w:", post) //true
        $.cookie('basket', true);
        
        if (!post) {
          window.qtyVar = query.match(/qty=(\d+)/);
          try {
            window.qtyVar = window.qtyVar[1];
          }
          catch (e) {
          }//==========================================
  
          window.totalVar = query.match(/total=(\d+(?:.?\d+)?)/);
          try {
            window.totalVar = window.totalVar[1];
          }
          catch (e) {
          }//==========================================
  
          window.shippingVar = query.match(/shipping=(\d+(?:.?\d+)?)/);
          try {
            window.shippingVar = window.shippingVar[1];
          }
          catch (e) {
          }
        }//==============================================================
        //console.log("window.qtyVar:", parseInt(window.qtyVar))
        if (window.qtyVar) {
          window.qtyVar = parseInt(window.qtyVar);
          $.cookie('qty', window.qtyVar);
        }
        
        $basketContents.removeClass(hidden);
        for (i = 0; i < $.cookie('qty'); i++) {
          $basketItems.eq(i).removeClass(hidden);
        }
        
        $miniQty.html($.cookie('qty'));
        $miniBasket.removeClass('empty');
        
        if (window.shippingVar)
          window.shippingVar = parseFloat(window.shippingVar);
        
        $.cookie('shipping', window.shippingVar);
        shipping = $.cookie('shipping');
        
        if (shipping == 'null' || shipping === 0 || shipping === '0') {
          shipping = 0;
          $basketShippingTotal.html('$ FREE');
          $drawerShippingTotal.html('$ FREE');
        }
        else {
          $basketShippingTotal.html('$' + Number(shipping).toFixed(2));
          $drawerShippingTotal.html('$' + Number(shipping).toFixed(2));
        }
        
        if (window.totalVar) {
       
          window.totalVar = parseFloat(window.totalVar);
          $.cookie('total', window.totalVar);
          //console.log("window var", window.totalVar)
        }
  
        total = $.cookie('total');
        grandtotal = Number(total) + Number(shipping);
        $basketSubTotal.html('$' + Number(total).toFixed(2));
        $miniTotal.html('$' + Number(total).toFixed(2));
        $drawerSubTotal.html('$' + Number(total).toFixed(2));
        $basketGrandTotal.html('$' + Number(grandtotal).toFixed(2));
        $drawerGrandTotal.html('$' + Number(grandtotal).toFixed(2));
        
        // if (post) {
        //   $('#quick_search').ScrollTo({
        //     duration: 200,
        //     onlyIfOutside: true,
        //   });
        //   $basketDrawer.slideDown();
        //   if (window.qtyVar === 1)
        //     $('.drawer_item').eq(0).removeClass(hidden);
        //   else
        //     $('.drawer_item').removeClass(hidden);
        // }
      },
      productAdd: function(el, data) {
        console.log("input hidden data", data)
        var $this = $(el);
        var dataObject = {};
        let newItem;
  
        for (let i = 0; i < data.length; i++){
          dataObject[data[i]['name']] = data[i]['value'];
        }
        console.log("data Obj", dataObject);
  
        if (dataObject.category == 2348639 ) {
          console.log("I am inside 2348639 ")
  
           newItem = new Octopus(dataObject.itemname, dataObject.category, dataObject.qty);
         console.log("newItem: ", newItem)
  
        } else if (dataObject.category === 'live') {
    
          newItem = new Live(dataObject.itemname, dataObject.pottype, dataObject.qty);
        } 
       
     newItem.logItem();
  
      //=================================================================
      // cookie
      //==================================================================
        if ($.cookie('basket-data')) { // not empty
          let cookieData = $.cookie('basket-data');
          let cookieArray = JSON.parse(cookieData);
          cookieArray.push(newItem);
          //==================================
          console.log( "cookies: " , cookieArray)
  
          $.cookie('basket-data', JSON.stringify(cookieArray));//to object
        } else { //first element
  
          let cookieArray = new Array(newItem);
          $.cookie('basket-data', JSON.stringify(cookieArray));
        }
       console.log( JSON.parse($.cookie('basket-data')));
        // console.log("data before parse: ", $.cookie('basket-data'));
        
        if ($.cookie('qty'))
          window.qtyVar = parseInt($.cookie('qty'));
        else
          window.qtyVar = 0;
        
        window.qtyVar = window.qtyVar + parseInt($this.find('input[name="qty"]').val());
        
        window.shippingVar = parseFloat($this.find('input[name="shipping"]').val());
        
        if ($.cookie('total'))
          window.totalVar = parseFloat($.cookie('total'));
        else
          window.totalVar = 0;
        
        window.totalVar = window.totalVar + (parseInt($this.find('input[name="qty"]').val()) * parseFloat($this.find('input[name="unitprice"]').val()));
        basket.calculate(true);
      }
    };
  
    
  //=============================================================
  //=============================================================
  //================================================================
    class Item{
      constructor(){
        this.type = 'Stationery';  
      }
      logItem() {
          console.log('%c' + this.type,'font-weight: bold');
          for (let prop in this) {
            console.log(' ', prop, ': ', this[prop])
          }
        };
    }
  
    class Octopus extends Item{
      constructor(brand, caption , quantity=1){
         super();//specifying a construcotr that's inheriting from another class; tow: use the this keyword
         this.brand = brand;
         this.caption = caption;
         this.quantity = quantity
      }
    }
   
  
  })();