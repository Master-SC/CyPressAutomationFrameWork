/// <reference types = "Cypress" />

describe("This is a test for hooks", function(){

    before(function(){
        //runs once before all the tests in the describe block
        // We need to resolve promise after cy.fixture()
        cy.fixture("PhotoCommerce").then(function(data){
            this.data=data
        })
    })


    it("TestCase-1 for hooks", function(){
        cy.visit(Cypress.env('url')+"/angularpractice/")
        // we have replaced all our hardcoded data with the data from testdata1.json usig this.data.name/gender
        cy.get("div.form-group input[name=name]").type(this.data.name).should('have.value',this.data.name)
        cy.get("select").select(this.data.gender).should("have.value",this.data.gender)
        // Validate Element Value
        cy.get("div.container h4 input").should('have.value',this.data.name)
        //Validate Attribute property
        cy.get("div.form-group input[name=name]").should("have.attr","minlength","2")
        //Validate Attribute state
        cy.get("input[value=option3]").should("be.disabled")
        cy.get("ul.navbar-nav li:nth-child(2) a").click()
        //Use customer Method
        cy.AddProductToBasket(this.data.product1)

        // Loop through data set
        this.data.productList.forEach(element =>{
            cy.AddProductToBasket(element)
        })

    })
})