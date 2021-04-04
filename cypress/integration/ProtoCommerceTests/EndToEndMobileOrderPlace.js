/// <reference types = "Cypress" />

import checkoutPage from '../../support/pageObJect/checkoutPage'
import homePage from '../../support/pageObJect/homePage'
import productPage from '../../support/pageObJect/productPage'
import purchasePage from '../../support/pageObJect/purchasePage'

describe("Validation of HomePage Functions",function(){

    before(function(){
        cy.fixture("PhotoCommerce").then(function(data){
            this.data=data
        })
    })

    it("Validate Basic Functions",function(){
        const homepage =new homePage()
        const productpage =new productPage()
        const checkoutpage = new checkoutPage()
        const purchasepage = new purchasePage()

        cy.visit(Cypress.env('url')+"/angularpractice/")
        homepage.getName().type(this.data.name).should('have.value',this.data.name)
        homepage.getGender().select(this.data.gender).should("have.value",this.data.gender)
        // Validate Element Value
        homepage.getTwoWayDatabinding().should('have.value',this.data.name)
        //Validate Attribute property
        homepage.getName().should("have.attr","minlength","2")
        //Validate Attribute state
        homepage.getEntrepreneurOption().should("be.disabled")
        homepage.getShopLink().click()

        //Use customer Method
        cy.AddProductToBasket(this.data.product1)

        // Loop through data set
        this.data.productList.forEach(element =>{
            cy.AddProductToBasket(element)
        })
        
        productpage.getCheckoutButton().click()


        var expectedProductCost=0

        checkoutpage.getProductTotalPrice().each(($e1,index,$list)=>{
            const productPrice = $e1.text()
            var proprice = productPrice.split(" ")
            var actualProPrice = Number(proprice[1])
            expectedProductCost = Number(expectedProductCost) + actualProPrice
        }).then(function(){
            cy.log("Expected Product Price is "+expectedProductCost)
        })

        checkoutpage.getTotalOrderPrice().then(function(costPrice){
            const price1=costPrice.text()
            var totprice = price1.split(" ")
            var actualBasketCost = Number(totprice[1])
            cy.log("Actual Basket Price is "+actualBasketCost).then(function(){
                expect(expectedProductCost).to.equal(actualBasketCost)
            })
        })
            
        checkoutpage.getCheckoutButton().click()

        purchasepage.getDeliveryLocation().should('have.attr',"id","country")
        //cy.config('defaultCommandTimeout',10000)
        purchasepage.getDeliveryLocation().type(this.data.locationSuggection)
        //cy.wait(6000)
        purchasepage.getSuggestionLocation().each(($e1,index,$list)=>{
            const location = $e1.text()
            if(location===this.data.deliveryLocation){
                purchasepage.getSuggestionLocation().eq(index).trigger('click')
            }
        })

        purchasepage.getDeliveryLocation().should('have.value',this.data.deliveryLocation)
        purchasepage.getTnCcheckBox().check({force: true}).should('be.checked')
        purchasepage.getPurchaseButton().click()
        purchasepage.getAlertPopUP().should('be.visible')
        purchasepage.getMsgCloseLink().should('have.attr',"href","#")
        purchasepage.getMsgCloseLink().should('have.text',"×")
        purchasepage.getSucessMsg().should('have.text',"Success!")
        purchasepage.getAlertPopUP().should('have.text',this.data.successMsg)

    })
})