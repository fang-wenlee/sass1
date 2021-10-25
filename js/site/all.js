(function() {
    $("#navigation").load("header.html");
    $("#footer").load("footer.html");

  $(document).ready(function(e) {
    $html.addClass('jquery');
    
    const queryString = window.location.search;
    const pId = queryString.slice(queryString.indexOf('=') +1);
 

    // fetch('../data.json').then(r => r.json())
    //   .then(data => console.log(data))
    //   .catch(e => console.log("Booo"))
   
  
    $.getJSON('../data.json', function (data) {
             
        if(!pId ){
                //=======  initialize======================================================= 
                  var output = '';
                  $.each(data, function (key, val) {
                    let formStr=""; 
                    let discountPrice =0;
                     output += `<div class="flexbox-item">
                      <a href=item2.html?pId=${val.prodId}  name="link to product page for ${val.prodId}" >
                    
                     <div class="posts-img"  alt="link to product page for ${val.prodId}"
                     style="background:url(${val.imageURL});background-size:cover; background-position:center;" >
                      <span id="goto-detail"> Product Detail </span>
                     </div>
                     </a>
                   
                     `;
    
                     formStr = `  <form method="get" class="basket_add_prod" id="basket_add_prod_${key}" >
                     <input type="hidden"  name="miniBasket" id="miniBasket" value="true"/>
                                <input type="hidden" name="total" id="total" value="${val.price}" />
                                <input type="hidden" name="shipping"  id="shipping" value="11"/> 
                                <input type="hidden" name="prodId" id="prodId" value="${val.prodId }" />
                                <input type="hidden" name="category" id="category" value="${val.listID} "/>
                                <input type="hidden" name="itemname" id="itemname" value="${val.brand} "/>
                                <input type="hidden"  name="qty" id="qty" value="1" />
                                `;
                 
     
                     if (val.isAvailable){
                         if(val.onSale){
                             discountPrice = ( ( (100 - parseInt( val.discount)) /100) * val.price).toFixed(2)
                             // console.log (discountPrice);
                             formStr += `<input type="hidden" name="unitprice" id="unitprice" value="${discountPrice}" />`;
                             output += `${formStr}
                                         <input type="submit" id="add-to-basket" class="checkout onSale float_right" value="Add to Basket" />
                                         </form>
                                        <div class="onsale-price" style="height:40px">
                                            <span id="test-on-sale">$ ${val.price}</span> <br/>
                                            <span id="special">Pay:<b> $ ${discountPrice}</b></span> 
                                        </div>`;
                         }else{
                             formStr += `<input type="hidden" name="unitprice" id="unitprice" value="${val.price}" />`;
                              output += `${formStr} <input type="submit" id="add-to-basket"  class="checkout float_right" value="Add to Basket" />
                                         </form>
                                         <div class="regular-price" style="height:40px"> 
                                         <span id="regular-sale">$ ${val.price}</span>
                                         </div>
                                         `;
                    
                             }
                     }       
                     else{ 
                         output += `<div class="out-of-stock">Out of stock</div> <b>$ ${val.price} </b>` ;
                     }
               
                     output += `<div class="posts-detail">Brand: ${val.brand}
                                <p>${val.caption.substring(0,34)}<b>....</b> </p>
                                </div>
                                `;
     
                   //===========================================================================
                     output += `<div class="list-price-normal" >`;
                     if(val.onSale){
                         output +=  `<img src = "../../images/site/cashback-icon.svg" alt="dollar sign" width="15px" height="15px"/>
                                     <span id="special">
                                         <b>${val.discount}% off </b>
                                     </span>
                                     </div>`;           
                     }
     
                     output += `<div class="list-price-mobile" >
                                 <b>$${val.price} </b> &nbsp; &nbsp; 
                                  </div></div></div>
    
                             `;
            
                 });
            
                $('section.main .flex-container').html(output);

                $('.basket_add_prod').on('submit', function(e) {
                  e.preventDefault();
                  basket.productAdd($(this), $(this).serializeArray());
                  basket.myFunction();
                  return false;
            
                });
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
      }else if( x === 'order'){
        prod = data.sort((a,b)=> (a.displayOrder > b.displayOrder) ? 1: -1 ) 
       }
             
  var output = '';
  

  $.each(prod, function (key, val) {
    let formStr="";
    let discountPrice =0;
    output += `<div class="flexbox-item">
    <a href=item2.html?pId=${val.prodId}  name="link to product page for ${val.prodId}" >
    <div class="posts-img" alt="${val.caption}"
    style="background:url(${val.mediumImageURL}); background-size:cover; background-position:center; text-align: center;" >
    <span id="goto-detail"> Product Detail </span>
    </div></a>`;
    
    formStr += `<form method="get" class="basket_add_prod_sort" id="basket_add_prod_${key}" >
    <input type="hidden"  name="miniBasket" id="miniBasket" value="true"/>
    <input type="hidden" name="total" id="total" value="${val.price}" />
    <input type="hidden" name="shipping"  id="shipping" value="11"/>   
    <input type="hidden" name="category" id="category" value="${val.listID}"/>
    <input type="hidden" name="prodId" id="prodId" value="${val.prodId} "/>
    <input type="hidden" name="itemname" id="itemname" value="${val.brand} "/>
    <input type="hidden"  name="qty" id="qty" value="1" />
    `;
   
    if (val.isAvailable){

        if(val.onSale){
            discountPrice = ( ( (100 - parseInt( val.discount)) /100) * val.price).toFixed(2)
            formStr += `<input type="hidden" name="unitprice" id="unitprice" value="${discountPrice}" />`;

            output += `
                  ${formStr}
                  <input type="submit" id="add-to-basket" class="checkout onSale float_right" value="Add to Basket" />
                  </form>
                  <div class="onsale-price" style="height:40px">
                  <span id="test-on-sale">$ ${val.price }</span> <br/>
                  <span id="special" >Pay:<b> $ ${discountPrice}</b></span> 
                  </div>
                  `;
        }else{
             formStr += `<input type="hidden" name="unitprice" id="unitprice" value="${val.price}" />`
             output += `${formStr}
                        <input type="submit" id="add-to-basket"  class="checkout float_right" value="Add to Basket" />
                        </form>
                        <div class="regular-price" style="height:40px"> 
                        <span id="regular-sale">$ ${val.price} </span>
                        </div>
                        `;
            }
    }       
    else{ 
        output += `<div class="out-of-stock">Out of stock</div> <b>$  ${val.price} </b>` ;
    }
  //==========================================================================

    output += `<div class="posts-detail">
               Brand: ${val.brand} 
               <p>${val.caption.substring(0,34)} <b>....</b> 
               </p>
               </div>
               `;

  //===========================================================================
            output += `<div class="list-price-normal" >`;
    if(val.onSale){
        output +=  `<img src = "../../images/site/cashback-icon.svg" alt="cashback icon" width="15px" height="15px"/>
                     <span id="special"><b>${val.discount}% off </b></span>
                     </div>`;        
    }

    output += `<div class="list-price-mobile" ><b>$ ${val.price}</b> &nbsp; &nbsp; `;

 
    output += `</div></div></div>`;
   });
 

   
     $('section.main .flex-container').html(output);  

     $('.basket_add_prod_sort').on('submit', function(e) {
     
      e.preventDefault();
      basket.productAdd($(this), $(this).serializeArray());
      basket.myFunction();
      return false;
    });


       });    
          
     }else if(pId) {
      // ======use for product-detail page============================================================
        var output = '',  discountStr ='';
        let onSaleStr ="notOnSale";
        proObj = data.filter(item=> (item.prodId == pId))
                   console.log("Prodout detai: ",proObj)
                        
        //item left =============== product image
                          var img = document.createElement('img');
                          img.setAttribute("src", proObj[0].imageURL);
                          img.setAttribute("alt", proObj[0].caption);
                      
                          document.getElementById("img-container").appendChild(img);
        // item right================== product detail
                    
                          let afterDiscount=proObj[0].price;
                          // console.log("Discount:", afterDiscount)  

                          if(proObj[0].onSale) {
                            onSaleStr = "onSale"; 
                            afterDiscount= ( ( (100 - parseFloat( proObj[0].discount)) /100) * proObj[0].price).toFixed(2)
                            var elemBtn =document.getElementById("addtoBasket");
                            elemBtn.classList.add("isOnSale");   //elemBtn.className += "isStock"
                            var prodBox =document.getElementById("prod-box");
                            prodBox.classList.add("isOnSale"); 
                            discountStr = `
                                  <img src = "../../images/site/cashback-icon.svg" alt="cash back icon" width="20px" height="20px" />
                                  <span id="special" ><b>${proObj[0].discount}% off</b></span>`       
                            
                          }
                      
                            document.getElementById('miniBasket').value = 'true';
                            document.getElementById('total').value = afterDiscount;
                            document.getElementById('shipping').value = '11';	
                            document.getElementById('unitprice').value =afterDiscount;	
                            document.getElementById('category').value = proObj[0].listID;
                            document.getElementById('itemname').value = proObj[0].brand;
                            document.getElementById('prodId').value = proObj[0].prodId;
                           
                            output = `
                            <div class="posts-detail ${ onSaleStr}"><p><b>Item #:</b> ${proObj[0].prodId}</p>
                            <b>Brand:</b> ${proObj[0].brand}
                            <p>${proObj[0].caption} <br/><br/> ${proObj[0].description} </p>`
        
                          if (proObj[0].isAvailable) {
                            output += `<div class="price-box">
                                       <div class="list-price-item item">
                                       <span id="price-label" > List price: </span>
                                       <span id="price-label">${proObj[0].price} </span> 
                                       </div>
                                      <div class="sale-price-item item ${onSaleStr}>
                                          <span id="sale-price"> ${discountStr}</span> 
                                         <span id="onsale-price">$ ${afterDiscount} </span>
                                      </div>
       
                                      </div>`;
                          }else {   
                            output += `<span id="notAvailable"> Out of Stock</span></div>`;
                            let qtyBox =document.getElementById("qty-box");
                            qtyBox.classList.add("notAvailable");
                          }
                      
    
                
                    $('.prod-flex-container .sidebar .prod-detail-box').html(output);
    
                  
        }  
                
      //======================================================
      //=======================================================
          $('nav a.mobile_menu').on('click', function () {
    
            var currentNavHeight = $('nav').height();
              console.log (currentNavHeight)
            if (currentNavHeight < 5) {
                var newNavHeight = $('nav >ul').height() + 80;
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
   
 
  });

  var html = document.documentElement,
    $html = $(html)
     hidden = 'hidden';
  

  var $miniQty = $('#mini_qty'),
    $miniTotal = $('#mini_total'),
     $drawerSubTotal = $('#drawer_sub_total'),
      $drawerShippingTotal = $('#drawer_shipping_total'),
   $drawerGrandTotal = $('#drawer_grand_total'),
    $basketSubTotal = $('#basket_sub_total'),
      $basketShippingTotal = $('#basket_shipping_total'),
     $basketGrandTotal = $('#basket_grand_total'),
    $miniBasket = $('a.basket');

  var basket = {
     init: function() {

    
      //open shopping cart=======================
      $('.cart').on('click', function() {
     
      if ($.cookie('basket')){
      $(".overlay").css("display","block" )
      $(".mini-basket-box").show("normal", function(){
                 $(".mini-basket-box").css("visibility","visible" )
            })
        
         basket.displayBasket()
        }
   
        return false;

      });
      //close shopping cart======================= 
      $('#close-basket').click( function() {
         if (  parseInt ( $.cookie('qty')) === 0 ) {
           alert("basket is empty")
           basket.removeCookies()
         }    

         $(".mini-basket-box").hide(1000,"swing" )
         $(".overlay").css("display","none" )
     });
     // add item to basket
      $('.basket_add').on('submit', function(e) {
        e.preventDefault();  
        console.log(e.target.id)
        basket.productAdd($(this), $(this).serializeArray());
        basket.myFunction();
        return false;
      });
  

      if (!$.cookie('basket') && !izilla_gup.miniBasket)
         $('#basket_empty').removeClass(hidden);
      else
        basket.calculate();
       
    },
    myFunction: function(){
     
      alert(""+ $.cookie('qty') +" item in your shooping cart")
      document.getElementById("mini_qty").innerHTML = $.cookie('qty')
      document.getElementById("mini_total").innerHTML = $.cookie('total')
    },
    displayBasket : function(){
         
    let data = JSON.parse ($.cookie('basket-data'));
    let output=""; 
    console.log("basket items prodct page: ", data)
    data.map(item=> {
          output += `<div class="prod-flex-container" >
          <div class="flexbox-img-item item">  
              <img src="../images/${item.prodId}.jpg" alt="${item.caption} "/>
          </div>
          <div class="flexbox-Detail-item  item-center">
            
              Item #:   ${item.prodId} </br/>
              Brand:  ${item.brand}</br>

            <input type="number" class="qty" min="0" max="10" name="qty" id="${item.prodId}" value=${item.quantity}>  
    
              <span><a class="deleteItem" id="${item.prodId}"> Delete </a></span>  
              <span id="inStock">in Stock</span> 
          </div>     
        <div class="flexbox-price-item item ">
          Price: $${item.unitprice}   
          </div>
        
      </div>
    `;
      
     })
  

    $('section.mini-basket-box .container').html(output);

    $('.deleteItem').on('click', function(e) {
      e.preventDefault();
  
      let cookieArray = JSON.parse($.cookie('basket-data'));
      let deleteItem = cookieArray.filter(item=> (item.prodId == e.target.id ));
                    
      let remainCookieItem =  cookieArray.filter(item=> item.prodId !== e.target.id )
    //update basket-data
      $.cookie('basket-data', JSON.stringify(remainCookieItem))
      //remove qty, update total from cookies
      //==================================
      $.cookie('qty', ( parseInt ( $.cookie('qty')) - deleteItem[0].quantity));
      $.cookie('total', ( parseFloat ( $.cookie('total')) - parseFloat(deleteItem[0].unitprice * deleteItem[0].quantity) ).toFixed(2));
      //update front Qty
      //===============================
       document.getElementById("mini_qty").innerHTML = $.cookie('qty');
       document.getElementById("mini_total").innerHTML = $.cookie('total');
      if( remainCookieItem.length===0 ){
          $(".mini-basket-box").hide(1000,"swing" )
          $(".overlay").css("display","none" )
          basket.removeCookies()
      }        
      else{
      basket.displayBasket();
      }

      return false;
    });
    //change qty=============================================
    $(".qty").click(function(e){
        e.preventDefault();
        basket.changeQty(e);
        
        return false;
    });
      // $(".qty").on("keyup", function(e){
      //   e.preventDefault();
      
      //      basket.changeQty(e)
      //   return false;
      //   });
    },
   
    changeQty: function(e){
      let productArray = JSON.parse($.cookie('basket-data'));
        var x = document.getElementById(e.target.id).value;
       
        let updateQty=  productArray.filter(item=> item.prodId == parseInt(e.target.id));
          console.log("need to be updatae:",updateQty)     
            let newTotal=0;
            let beforeTotal = parseFloat ( updateQty[0].unitprice) * parseInt(updateQty[0].quantity) ;
            console.log("beforeTotal: ", beforeTotal)
                        let otherItemTotal = parseFloat($.cookie('total') - beforeTotal);
                        console.log("otherItemTotal = cookieTotal - beforeTotal: ", otherItemTotal)
    
                        let changeTotal  =  x * parseFloat( updateQty[0].unitprice);
                        console.log("changeTotal: new Qty * price: ", changeTotal)
                      
                        newTotal = parseFloat( otherItemTotal + changeTotal);
                        console.log("Total = otherItemTotal + changeTotal", newTotal)
                        // qty
                      
                        let otherItemQty =  parseInt( $.cookie('qty')) - parseInt( updateQty[0].quantity );
                        console.log("otherItemQty", otherItemQty)
                        updateQty[0].quantity = x;
                        let newItemQty = otherItemQty  + parseInt(x);
                        document.getElementById("mini_qty").innerHTML = newItemQty;
                        document.getElementById("mini_total").innerHTML = newTotal;
                   
     
                        $.cookie('total', parseFloat(newTotal));
                        $.cookie('qty',  parseInt( newItemQty) );    
                        $.cookie('basket-data', JSON.stringify(productArray)) ;

    },
    removeCookies: function(){
     
      $.removeCookie('basket');
      $.removeCookie('qty');
      $.removeCookie('shipping');
      $.removeCookie('total');
      $.removeCookie('basket-data');
      var wl = window.location.toString();
      wl = wl.replace('clearBasket=true', '');
      window.location = wl;
      basket.myFunction();
     
    },
    calculate: function(post) {
      var $basketContents = $('.prod-flex-container'),
        $basketItems = $('.item-center'),
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
      
 
      
      $miniQty.html($.cookie('qty'));
      // $miniBasket.removeClass('empty');
      
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
      
   
    },
    productAdd: function(el, data) {
      // console.log("input hidden data", data)
      var $this = $(el);
      var dataObject = {};
      let newItem;

    
      for (let i = 0; i < data.length; i++){
        dataObject[data[i]['name']] = data[i]['value'];
      }
      console.log("data Obj", dataObject);

      if (dataObject.category == 2348639 ) { 
          newItem = new Octopus(dataObject.prodId, dataObject.itemname, dataObject.category, dataObject.qty, dataObject.unitprice);
          console.log("newItem: ", newItem)
      } 
     
   //newItem.logItem();
    
    //=================================================================
    // cookie
    //==================================================================
    if ($.cookie('basket-data')  ) { // 
        
        let cookieArray = JSON.parse( $.cookie('basket-data'));
        console.log(cookieArray)
        let cookieItem =  cookieArray.filter(item=> item.prodId === newItem.prodId )
      
        if(  cookieItem.length >= 1  ){
              alert("same prodId" , ) 
            
              //update cookies basket-data
              console.log("original qty:", cookieItem [0].quantity )
              console.log("original unit Price:", cookieItem [0].unitprice )

              let originlQty  =  cookieItem[0].quantity;
              let originalPrice =  cookieItem[0].unitprice;
              let originalTotal =  parseInt(originlQty) * parseFloat (originalPrice);

              cookieItem[0].quantity =  parseInt ( cookieItem[0].quantity )+1
              console.log("update qty:", cookieItem [0].quantity )
              let updateTotal = parseInt ( cookieItem[0].quantity) * parseFloat( cookieItem[0].unitprice) ;
             
              //update qty, total cookies
              $.cookie('qty', ( parseInt ( $.cookie('qty')) + 1));

              //  updateTotal()
             
               let cookieTotal = $.cookie('total')
               $.cookie('total', parseFloat( (cookieTotal - originalTotal) + updateTotal ))
              //  console.log("qty: ", cookieArray[0].quantity)
          
               $.cookie('basket-data', JSON.stringify(cookieArray));
             


               return true;  
        }
        else 
            cookieArray.push(newItem);
               
      
        $.cookie('basket-data', JSON.stringify(cookieArray));
      } else { //first element
            let cookieArray = new Array(newItem);
            $.cookie('basket-data', JSON.stringify(cookieArray));
      }
     console.log( "cookies value: ", JSON.parse($.cookie('basket-data')));
     //  console.log("data before parse: ", $.cookie('basket-data'));
      
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
    constructor( prodId, brand, category, quantity=1, unitprice){
       super();//specifying a construcotr that's inheriting from another class; tow: use the this keyword
       this.prodId = prodId;
       this.brand = brand;     
       this.category = category;
       this.quantity = quantity;
       this.unitprice = unitprice;
    }
  }
 

})();