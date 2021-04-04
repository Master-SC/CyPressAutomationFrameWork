class productPage{
    getCheckoutButton(){
        return cy.get("div#navbarResponsive ul li a")
    }
}

export default productPage