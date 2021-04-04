/// <reference types = "Cypress" />

import homePage from "../../support/pageObjectGreenKart/homepage"

describe("Kart Functionality", function(){


    beforeEach(function(){
        cy.visit(Cypress.env("url")+"/seleniumPractise/")
        cy.fixture("GreenKart").then(function(data){
            this.data=data
        })
    })

    it("Validate GreenKart Text in Home Page", function(){
        const homepage= new homePage()
        homepage.getGreenKartText().should("have.text",this.data.greenkarttext)
    })

    it("Validate Search Box is displayed",function(){
        const homepage = new homePage()
        homepage.getProductSearchBox().should("have.attr","placeholder",this.data.greenkartsearchboxtext)
    })

    it("Search Product functionality",function(){
        const homepage= new homePage()
        homepage.getProductSearchBox().type(this.data.greenkartsearchitem).should('have.value',this.data.greenkartsearchitem)
        cy.wait(2000)
        homepage.getSearchedProduct().each(($e1,index,$list)=>{
            var prodname=$e1.find(this.data.findproductName).text()
            var prodprice=$e1.find(this.data.findproductPrice).text()
            cy.log('The product in '+index+' have price :: '+prodprice+' have name :: '+prodname)
        })
    })

    it("Product Search and Validation",function(){
        const homepage= new homePage()
        homepage.getProductSearchBox().type(this.data.greenkartsearch).should('have.value',this.data.greenkartsearch)
        homepage.getProductName().should('have.text',this.data.greenkartsearch)
        homepage.getProductPrice().should('have.text',this.data.capsicumPrice)
    })

    it("Product Increment functionality",function(){
        const homepage= new homePage()
        homepage.getProductSearchBox().type(this.data.greenkartsearch).should('have.value',this.data.greenkartsearch)
        homepage.getProductName().should('have.text',this.data.greenkartsearch)
        homepage.getProductPrice().should('have.text',this.data.capsicumPrice)
        homepage.getTotalBasketPrice().should('have.text',this.data.emptybasketPrice)
        homepage.getTotalNumberOfItem().should('have.text',this.data.emptybasketQty)
        homepage.getAddToCart().click()
        homepage.getTotalBasketPrice().should('have.text',this.data.capsicumPrice)
        homepage.getTotalNumberOfItem().should('not.have.text',this.data.emptybasketQty)
        homepage.getTotalBasketPrice().should('not.have.text',this.data.emptybasketPrice)
    })


})